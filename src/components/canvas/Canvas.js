import React, { Component, createRef } from "react";
import { fabric } from "fabric";
import "./Canvas.css";

class Canvas extends Component {
  constructor() {
    super();
    this.canvasWrapperRef = createRef();
    this.canvas = null;
  }

  updateDimensions = () => {
    let canvasWidth = this.canvasWrapperRef.current.clientWidth;
    let canvasHeight = this.canvasWrapperRef.current.clientHeight;
    //update canvas size
    this.canvas.setWidth(canvasWidth);
    this.canvas.setHeight(canvasHeight);
    //update image size
    let image = this.canvas._objects[0];
    this.scaleImage(image, canvasWidth, canvasHeight);
    this.canvas.centerObject(image);
    //render
    this.canvas.renderAll();
  };

  componentDidMount = () => {
    let canvasWidth = this.canvasWrapperRef.current.clientWidth;
    let canvasHeight = this.canvasWrapperRef.current.clientHeight;
    //create canvas
    this.canvas = new fabric.Canvas("canvas", {
      selection: false,
      backgroundColor: "black",
      hoverCursor: "context-menu",
      height: canvasHeight,
      width: canvasWidth,
    });
    //scale image
    let image = this.scaleImage(this.props.image, canvasWidth, canvasHeight);
    image.set({ selectable: false });
    this.canvas.add(image);
    this.canvas.centerObject(image);
    this.canvas.renderAll();
    //register resive event listener
    window.addEventListener("resize", this.updateDimensions);
  };

  componentDidUpdate = () => {
    let image = this.canvas._objects[0];
    //remove all filters
    //to do - look into updating rather than replacing
    image.filters = [];
    this.applyFilters();
    this.applySliders();
    image.applyFilters();
    this.canvas.renderAll();
  };

  scaleImage = (image, width, height) => {
    image.scaleToHeight(height);
    if (image.getScaledWidth() >= width) {
      image.scaleToWidth(width);
    }
    return image;
  };

  applyFilters = () => {
    let filters = this.props.filters;
    let image = this.canvas._objects[0];
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].enabled === false) continue;
      image.filters.push(filters[i].function);
    }
  };

  applySliders = () => {
    let sliders = this.props.sliders;
    let image = this.canvas._objects[0];
    for (let i = 0; i < sliders.length; i++) {
      let slider = sliders[i];
      let sliderFunction = new fabric.Image.filters[slider.functionName]({
        [slider.control]: parseFloat(slider.value),
      });
      image.filters.push(sliderFunction);
    }
  };

  render = () => {
    return (
      <div
        ref={this.canvasWrapperRef}
        id="main-canvas-wrapper"
        className="row justify-content-center"
      >
        <canvas id="canvas" />
      </div>
    );
  };
}

export default Canvas;
