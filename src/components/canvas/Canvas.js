import React, { Component, createRef } from "react";
import { fabric } from "fabric";
import "./Canvas.css";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasWrapperRef = createRef();
    this.canvas = null;
  }

  updateDimensions = () => {
    let canvasWidth = this.canvasWrapperRef.clientWidth;
    let canvasHeight = this.canvasWrapperRef.clientHeight;
    console.log(canvasHeight);
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
    console.log("mounting", this.canvasWrapperRef.clientHeight);
    let canvasWidth = this.canvasWrapperRef.clientWidth;
    let canvasHeight = this.canvasWrapperRef.clientHeight;
    //create canvas
    this.canvas = new fabric.Canvas("canvas", {
      selection: false,
      backgroundColor: "black",
      hoverCursor: "context-menu",
      height: canvasHeight,
      width: canvasWidth,
    });
    let image = this.props.image;
    //scale image
    this.scaleImage(image, canvasWidth, canvasHeight);
    image.set({ selectable: false });
    this.canvas.add(image);
    this.canvas.centerObject(image);
    this.canvas.renderAll();
    console.log(this.canvasWrapperRef.clientHeight);
    //register resive event listener
    window.addEventListener("resize", this.updateDimensions);
  };

  componentDidUpdate = () => {
    let image = this.canvas._objects[0];
    image.filters = [];
    this.applyFilters();
    this.applySliders();
    image.applyFilters();
    this.canvas.renderAll();
  };

  //remove the window event listener on unmount
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };

  scaleImage = (image, width, height) => {
    image.scaleToHeight(height);
    if (image.getScaledWidth() >= width) {
      image.scaleToWidth(width);
    }
  };

  applyFilters = () => {
    let filters = this.props.filters;
    let image = this.canvas._objects[0];
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].enabled === false) continue;
      let filter = filters[i];
      let filterFunction = new fabric.Image.filters[filter.functionName]();
      image.filters.push(filterFunction);
    }
  };

  applySliders = () => {
    let sliders = this.props.sliders;
    let image = this.canvas._objects[0];
    for (let i = 0; i < sliders.length; i++) {
      let slider = sliders[i];
      let value = parseFloat(slider.value);
      if (value === 0) continue;
      let sliderFunction = new fabric.Image.filters[slider.functionName]({
        [slider.control]: value,
      });
      image.filters.push(sliderFunction);
    }
  };

  render = () => {
    return (
      <div
        ref={(wrapper) => {
          this.canvasWrapperRef = wrapper;
        }}
        id="main-canvas-wrapper"
        className="row justify-content-center flex-grow-1 "
      >
        <canvas id="canvas" />
      </div>
    );
  };
}

export default Canvas;
