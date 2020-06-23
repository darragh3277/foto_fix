import React, { Component } from "react";
import { fabric } from "fabric";
import "./FilterPreview.css";

class FilterPreview extends Component {
  constructor() {
    super();
    this.canvas = null;
  }
  componentDidMount = () => {
    this.canvas = new fabric.Canvas("canvas_" + this.props.filter.name, {
      selection: false,
      hoverCursor: "pointer",
      width: 100,
      height: 100,
    });
    fabric.Image.fromURL(this.props.img, (img) => {
      console.log("image", img);
      img.set({ selectable: false });
      img.scaleToHeight(100);
      img.scaleToHeight(100);
      img.filters.push(this.props.filter.function);
      img.applyFilters();
      this.canvas.add(img);
      this.canvas.centerObject(img);
      this.canvas.renderAll();
    });
    console.log("canvas", this.canvas);
  };

  render = () => {
    return (
      <span
        className={this.props.filter.enabled ? "bg-primary" : null}
        onClick={(e) => this.props.handleFilterToggle(e, this.props.filter)}
      >
        <canvas
          width="100px"
          height="100px"
          id={"canvas_" + this.props.filter.name}
        ></canvas>
        <p className="text-light text-center label my-1">
          {this.props.filter.name}
        </p>
      </span>
    );
  };
}

export default FilterPreview;
