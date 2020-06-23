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
      img.set({ selectable: false });
      img.scaleToHeight(100);
      img.scaleToHeight(100);
      img.filters.push(this.props.filter.function);
      img.applyFilters();
      this.canvas.add(img);
      this.canvas.centerObject(img);
      this.canvas.renderAll();
    });
  };

  render = () => {
    return (
      <span className={this.props.filter.enabled ? "bg-primary" : null}>
        {/* Messy work with click and mouse events. This hack works for now */}
        <span
          width="100px"
          height="100px"
          className="clicker"
          onClick={() => {
            this.props.handleFilterToggle(
              this.props.filter,
              this.props.selectedIndex
            );
          }}
        ></span>
        <canvas
          width="100px"
          height="100px"
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
