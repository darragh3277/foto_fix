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

  handleImageUpload = (e) => {
    if (e.target.files.length < 1) return;
    let url = URL.createObjectURL(e.target.files[0]);
    this.setState({
      image: url,
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

  handleClearCanvas = () => {
    this.canvas = null;
    this.setState({
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
    this.setState({
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

  handleFilterToggle = (filter) => {
    let index = this.state.selectedFilters.indexOf(filter);
    let filters = [...this.state.selectedFilters];
    if (index > -1) {
      filters.splice(index, 1);
    } else {
      filters.push(filter);
    }
    this.setState({
      selectedFilters: filters,
    });
  };

  componentDidUpdate = () => {
    this.canvas = new fabric.Canvas("canvas", {
      selection: false,
      hoverCursor: "context-menu",
      backgroundColor: "#2b2e31",
      width: 500,
      height: 300,
    });
    if (this.state.image !== null) {
      fabric.Image.fromURL(this.state.image, (img) => {
        img.set({ selectable: false });
        img.scaleToWidth(500);
        img.scaleToHeight(300);
        for (let i = 0; i < this.state.selectedFilters.length; i++) {
          img.filters.push(this.state.selectedFilters[i].function);
        }
        img.applyFilters();
        this.canvas.add(img);
        this.canvas.centerObject(img);
      });
    }
  };

  render = () => {
    let display = <Upload onChange={this.handleImageUpload} />;
    if (this.state.image !== null) {
      display = (
        <>
          <Canvas ref={this.canvasRef} />
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
      <Container fluid className="vh-100 bg-dark">
        <Row className="justify-content-center pt-3" onClick={this.getRefDeets}>
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
