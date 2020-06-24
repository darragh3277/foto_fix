import React, { Component } from "react";
import { fabric } from "fabric";
import "./FilterPreview.css";

class FilterPreview extends Component {
  constructor() {
    super();
    this.width = 100;
    this.height = 100;
    this.canvas = null;
  }
  componentDidMount = () => {
    this.canvas = new fabric.Canvas("canvas_" + this.props.filter.name, {
      selection: false,
      hoverCursor: "pointer",
      width: this.width,
      height: this.height,
    });
    let image = this.props.image;
    image.set({ selectable: false });
    if (image.width >= image.height) {
      image.scaleToHeight(this.height);
      image.scaleToWidth(this.width);
    } else {
      image.scaleToWidth(this.width);
      image.scaleToHeight(this.height);
    }
    image.filters = [];
    let x = new fabric.Image.filters[this.props.filter.functionName]();
    image.filters.push(x);
    console.log(image.filters);
    image.applyFilters();
    console.log("f", image.getScaledHeight(), image.getScaledWidth());
    this.canvas.add(image);
    this.canvas.centerObject(image);
    this.canvas.renderAll();
    console.log("f - m", image.image_id);
  };

  render = () => {
    return (
      <span className={this.props.filter.enabled ? "bg-primary" : null}>
        {/* Messy work with click and mouse events. This hack works for now */}
        <span
          width={this.width + "px"}
          height={this.height + "px"}
          className="clicker"
          onClick={() => {
            this.props.handleFilterToggle(
              this.props.filter,
              this.props.selectedIndex
            );
          }}
        ></span>
        <canvas
          width={this.width + "px"}
          height={this.height + "px"}
          id={"canvas_" + this.props.filter.name}
        ></canvas>
        <p
          className="text-light text-center label my-1"
          onClick={(e) => {
            this.props.handleFilterToggle(
              this.props.filter,
              this.props.selectedIndex
            );
          }}
        >
          {this.props.filter.name}
        </p>
      </span>
    );
  };
}

export default FilterPreview;
