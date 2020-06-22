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
    let width = this.canvasWrapperRef.current.clientWidth;
    let canvas = this.props.canvas;
    let image = this.props.canvas._objects[0];
    let orientation = image.width >= image.height ? "landscape" : "portrait";
    this.setState({ width });
    canvas.setWidth(width);
    canvas.calcOffset();
    image.scaleToWidth(width);
    if (orientation === "landscape" && image.getScaledHeight() >= 300) {
      image.scaleToHeight(this.state.height);
    }
    canvas.centerObject(image);
    canvas.renderAll();
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
    let canvas = new fabric.Canvas("canvas", {
      selection: false,
      hoverCursor: "context-menu",
      backgroundColor: "#2b2e31",
      width: this.canvasWrapperRef.current.clientWidth,
      height: this.state.height,
    });
    fabric.Image.fromURL(this.props.image, (img) => {
      img.set({ selectable: false });
      img.scaleToWidth(this.state.width);
      img.scaleToHeight(this.state.height);
      canvas.add(img);
      canvas.centerObject(img);
    });
    this.props.handleCanvasMount(canvas);
  };

  componentDidUpdate = () => {
    let image = this.props.canvas._objects[0];
    if (image === undefined) return;
    let filters = this.props.filters;
    image.filters = [];
    for (let i = 0; i < filters.length; i++) {
      image.filters.push(filters[i].function);
    }
    image.applyFilters();
    this.props.canvas.renderAll();
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
