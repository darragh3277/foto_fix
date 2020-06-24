import React, { Component, createRef } from "react";
import { fabric } from "fabric";
import { isFunctionTypeNode } from "typescript";

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
    let image = this.props.image;
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
      height: this.state.height,
      width: this.state.width,
    });
    let image = this.props.image;
    image.set({ selectable: false });
    image = this.setScale(image);
    canvas.setWidth(image.getScaledWidth());
    canvas.setHeight(image.getScaledHeight());
    canvas.add(image);
    console.log("c", image.getScaledHeight(), image.getScaledWidth());
    canvas.centerObject(image);
    this.props.handleCanvasMount(canvas);
  };

  componentDidUpdate = () => {
    let image = this.props.image;
    image = this.applyFilters(image);
    image = this.applySliders(image);
    image.applyFilters();
    this.props.canvas.renderAll();
    console.log("cv - u", image.image_id);
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
    let filters = fabric.Image.filters;
    for (let i = 0; i < sliders.length; i++) {
      let slider = sliders[i];
      let sliderFunction = new filters[slider.functionName]({
        [slider.control]: slider.value,
      });
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
