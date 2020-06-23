import React, { Component, createRef } from "react";
import { fabric } from "fabric";

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
    if (
      this.canvasWrapperRef.current === undefined ||
      this.canvasWrapperRef.current === null
    ) {
      return;
    }
    let width = this.canvasWrapperRef.current.clientWidth;
    let canvas = this.props.canvas;
    let image = this.props.canvas._objects[0];
    this.setState({ width });
    canvas.calcOffset();
    image = this.setScale(image);
    canvas.setWidth(image.getScaledWidth());
    canvas.centerObject(image);
    canvas.renderAll();
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
    let canvas = new fabric.Canvas("canvas", {
      selection: false,
      hoverCursor: "context-menu",
      backgroundColor: "#2b2e31",
      height: this.state.height,
    });
    fabric.Image.fromURL(this.props.image, (img) => {
      img = this.setScale(img);
      canvas.setWidth(img.getScaledWidth());
      canvas.setHeight(img.getScaledHeight());
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
    this.props.canvas.setWidth(image.getScaledWidth());
    this.props.canvas.setHeight(image.getScaledHeight());
    this.props.canvas.centerObject(image);
    image.applyFilters();
    this.props.canvas.renderAll();
  };

  setScale = (image) => {
    let width = this.canvasWrapperRef.current.clientWidth;
    image.scaleToHeight(this.state.height);
    if (image.getScaledWidth() >= width) {
      image.scaleToWidth(width);
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
      let sliderFunction = new fabric.Image.filters[slider.functionName](
        settings
      );
      image.filters.push(sliderFunction);
    }
    return image;
  };

  render = () => {
    return (
      <div ref={this.canvasWrapperRef} className="row justify-content-center">
        <canvas id="canvas" />
      </div>
    );
  };
}

export default Canvas;
