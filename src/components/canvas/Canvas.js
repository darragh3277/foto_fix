import React, { Component, createRef } from "react";
import { fabric } from "fabric";
import "./Canvas.css";

class Canvas extends Component {
  constructor() {
    super();
    this.canvasWrapperRef = createRef();
    this.state = {
      width: 500,
      height: 300,
    };
  }

  updateDimensions = () => {
    if (this.canvasWrapperRef === undefined || this.canvasWrapperRef === null) {
      return;
    }
    let width = this.canvasWrapperRef.current.clientWidth;
    let canvas = this.props.canvas;
    let image = this.props.canvas._objects[0];
    this.setState({ width });
    canvas.setWidth(width);
    canvas.calcOffset();
    image = this.setScale(image);
    canvas.centerObject(image);
    canvas.renderAll();
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
    let width = this.canvasWrapperRef.current.clientWidth;
    let canvas = new fabric.Canvas("canvas", {
      selection: false,
      hoverCursor: "context-menu",
      backgroundColor: "#2b2e31",
      width,
      height: this.state.height,
    });
    fabric.Image.fromURL(this.props.image, (img) => {
      img = this.setScale(img);
      img.set({ selectable: false });
      canvas.add(img);
      canvas.centerObject(img);
    });
    this.props.handleCanvasMount(canvas);
  };

  componentDidUpdate = () => {
    let image = this.props.canvas._objects[0];
    if (image === undefined) return;
    image = this.applyFilters(image);
    image = this.applySliders(image);
    image.applyFilters();
    this.props.canvas.renderAll();
  };

  setScale = (image) => {
    let width = this.canvasWrapperRef.current.clientWidth;
    let orientation = image.width >= image.height ? "landscape" : "portrait";
    image.scaleToWidth(width);
    if (
      orientation === "landscape" &&
      image.getScaledHeight() >= this.state.height
    ) {
      image.scaleToHeight(this.state.height);
    }
    return image;
  };

  applyFilters = (image) => {
    let filters = this.props.filters;
    image.filters = [];
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].enabled === false) continue;
      image.filters.push(filters[i].function);
    }
    return image;
  };

  applySliders = (image) => {
    let sliders = this.props.sliders;
    for (let i = 0; i < sliders.length; i++) {
      let slider = sliders[i];
      let settings = { [slider.control]: slider.value };
      let sliderFunction = new fabric.Image.filters[slider.name](settings);
      image.filters.push(sliderFunction);
    }
    return image;
  };

  render = () => {
    return (
      <div ref={this.canvasWrapperRef} className="row justify-content-center">
        <canvas className="border rounded" id="canvas" />
      </div>
    );
  };
}

export default Canvas;
