import React, { Component } from "react";
import Canvas from "./components/Canvas/Canvas";
import Header from "./components/Header/Header";
import Controls from "./components/Controls/Controls";
import Upload from "./components/Upload/Upload";
import { sliders } from "./filters/Filters";
import { Container, Row, Col } from "reactstrap";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      canvas: null,
      image: null,
      selectedFilters: [],
      sliders,
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
    let sliders = [...this.state.sliders];
    for (let i = 0; i < sliders.length; i++) {
      sliders[i].value = sliders[i].defaultValue;
    }
    this.setState({
      canvas,
      selectedFilters: [],
      image: null,
      sliders,
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
    let sliders = [...this.state.sliders];
    for (let i = 0; i < sliders.length; i++) {
      sliders[i].value = sliders[i].defaultValue;
    }
    this.setState({
      canvas,
      sliders,
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
    let sliders = [...this.state.sliders];
    let si = sliders.findIndex((s) => s === slider);
    sliders[si].value = value;
    this.setState({
      sliders,
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
            sliders={this.state.sliders}
            handleCanvasMount={this.handleCanvasMount}
          />
          <Controls
            img={this.state.image}
            selectedFilters={this.state.selectedFilters}
            sliderValues={this.state.sliderValues}
            sliders={this.state.sliders}
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
