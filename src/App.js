import React, { Component } from "react";
import Canvas from "./components/canvas/Canvas";
import Header from "./components/header/Header";
import Controls from "./components/controls/Controls";
import Upload from "./components/upload/Upload";
import { Container, Row, Col } from "reactstrap";
import { fabric } from "fabric";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      canvas: null,
      image: null,
      selectedFilters: [],
      sliderValues: [
        { Brightness: 0 },
        { Contrast: 0 },
        { Blur: 0 },
        { Saturation: 0 },
        { Pixelate: 2 },
      ],
    };
  }

  handleCanvasMount = (canvas) => {
    this.setState({
      canvas,
    });
  };

  handleImageUpload = (e) => {
    if (e.target.files.length < 1) return;
    let url = URL.createObjectURL(e.target.files[0]);
    this.setState({
      image: url,
    });
  };

  handleClearCanvas = () => {
    let canvas = null;
    this.setState({
      canvas,
      selectedFilters: [],
      image: null,
      sliderValues: [
        { Brightness: 0 },
        { Contrast: 0 },
        { Blur: 0 },
        { Saturation: 0 },
        { Pixelate: 2 },
      ],
    });
  };

  handleResetImage = () => {
    let canvas = this.state.canvas;
    canvas._objects[0].filters = [];
    canvas._objects[0].applyFilters();
    canvas.renderAll();
    this.setState({
      canvas,
      selectedFilters: [],
      sliderValues: [
        { Brightness: 0 },
        { Contrast: 0 },
        { Blur: 0 },
        { Saturation: 0 },
        { Pixelate: 2 },
      ],
    });
  };

  handleSliderChange = (slider, value) => {
    let sliderValues = [...this.state.sliderValues];
    let sliderIndex = sliderValues.findIndex(
      (s) => s[slider.name] !== undefined
    );
    sliderValues[sliderIndex][slider.name] = value;
    let filters = [...this.state.selectedFilters];
    let index = filters.indexOf(slider);
    let settings = { [slider.control]: value };
    slider.function = new fabric.Image.filters[slider.name](settings);
    if (index > -1) {
      filters[index] = slider;
    } else {
      filters.push(slider);
    }
    this.setState({
      selectedFilters: filters,
      sliderValues,
    });
  };

  handleFilterToggle = (filter) => {
    let index = this.state.selectedFilters.indexOf(filter);
    let filters = [...this.state.selectedFilters];
    if (index === -1) {
      filters.push(filter);
    } else {
      filters.splice(index, 1);
    }
    this.setState({
      selectedFilters: filters,
    });
  };

  render = () => {
    let display = <Upload onChange={this.handleImageUpload} />;
    if (this.state.image !== null) {
      display = (
        <>
          <Canvas
            canvas={this.state.canvas}
            image={this.state.image}
            filters={this.state.selectedFilters}
            handleCanvasMount={this.handleCanvasMount}
          />
          <Controls
            img={this.state.image}
            selectedFilters={this.state.selectedFilters}
            sliderValues={this.state.sliderValues}
            handleFilterToggle={this.handleFilterToggle}
            handleClearCanvas={this.handleClearCanvas}
            handleResetImage={this.handleResetImage}
            handleSliderChange={this.handleSliderChange}
          />
        </>
      );
    }
    return (
      <Container fluid className="bg-dark">
        <Row
          className="justify-content-center bg-dark py-3"
          onClick={this.getRefDeets}
        >
          <Col xs={8}>
            <Header />
            {display}
          </Col>
        </Row>
      </Container>
    );
  };
}

export default App;
