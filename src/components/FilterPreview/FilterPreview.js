import React, { Component } from "react";
import { fabric } from "fabric";
import "./FilterPreview.css";

class FilterPreview extends Component {
  componentDidMount = () => {
    let canvas = new fabric.Canvas("canvas_" + this.props.filter.name, {
      selection: false,
      hoverCursor: "context-menu",
      backgroundColor: "#2b2e31",
    });
    fabric.Image.fromURL(this.props.img, (img) => {
      img.set({ selectable: false });
      img.scaleToWidth(300);
      img.scaleToHeight(150);
      img.filters.push(this.props.filter.function);
      img.applyFilters();
      canvas.add(img);
      canvas.centerObject(img);
    });
  };

  render = () => {
    return (
      <>
        <canvas
          className="border rounded"
          height="100%"
          width="100%"
          id={"canvas_" + this.props.filter.name}
        />
        <p className="text-center mb-0 filter-preview-title">
          {this.props.filter.name}
        </p>
      </>
    );
  };
}

export default FilterPreview;
