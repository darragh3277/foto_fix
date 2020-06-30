import React, { Component } from "react";
import { fabric } from "fabric";
import "./FilterPreview.css";

class FilterPreview extends Component {
  constructor() {
    super();
    this.width = 100;
    this.height = 100;
  }

  componentDidMount = () => {
    let canvas = new fabric.Canvas("canvas_" + this.props.filter.name, {
      selection: false,
      hoverCursor: "pointer",
      width: this.width,
      height: this.height,
    });
    let image = this.props.image;
    image.set({ selectable: false });
    image.scaleToWidth(this.width);
    this.setupFilters();
    image.applyFilters();
    canvas.add(image);
    canvas.centerObject(image);
    canvas.renderAll();
  };

  setupFilters = () => {
    let image = this.props.image;
    //remove
    image.filters = [];
    //add
    image.filters.push(
      new fabric.Image.filters[this.props.filter.functionName]()
    );
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
