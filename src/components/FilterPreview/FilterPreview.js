import React, { Component, createRef } from "react";
import { fabric } from "fabric";
import "./FilterPreview.css";

class FilterPreview extends Component {
  constructor() {
    super();
    this.canvasWrapperRef = createRef();
  }

  componentDidMount = () => {
    let canvas = new fabric.Canvas("canvas_" + this.props.filter.name, {
      selection: false,
      hoverCursor: "pointer",
      backgroundColor: "#2b2e31",
    });
    fabric.Image.fromURL(this.props.img, (img) => {
      img.set({ selectable: false });
      if (
        this.canvasWrapperRef !== null &&
        this.canvasWrapperRef !== undefined
      ) {
        img.scaleToWidth(this.canvasWrapperRef.current.clientWidth);
        img.scaleToHeight(this.canvasWrapperRef.current.clientHeight);
      }
      img.filters.push(this.props.filter.function);
      img.applyFilters();
      canvas.add(img);
      canvas.centerObject(img);
    });
  };

  render = () => {
    let selected = "col-xs-12 text-light";
    if (this.props.selectedFilters.includes(this.props.filter))
      selected = "col-xs-12 text-primary";
    return (
      <div
        ref={this.canvasWrapperRef}
        onClick={() => this.props.handleFilterToggle(this.props.filter)}
        className={selected}
      >
        <div className={"row justify-content-center"}>
          <div className="col-12 mx-1">
            <canvas
              className="border rounded col-12 p-0"
              height="100%"
              width="100%"
              id={"canvas_" + this.props.filter.name}
            />
            <p
              className={
                "text-center mb-0 col-12 p-0 filter-preview-title " + selected
              }
            >
              {this.props.filter.name}
            </p>
          </div>
        </div>
      </div>
    );
  };
}

export default FilterPreview;
