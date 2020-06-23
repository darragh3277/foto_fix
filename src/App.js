import React, { Component } from "react";
import Canvas from "./components/Canvas/Canvas";
import Header from "./components/Header/Header";
import Controls from "./components/Controls/Controls";
import Upload from "./components/Upload/Upload";
import { sliders, filters } from "./filters/Filters";
import { Container, Row, Col } from "reactstrap";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      canvas: null,
      image: null,
      selectedFilters: [],
      filters,
      sliders,
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
    let filters = [...this.state.filters];
    for (let i = 0; i < filters.length; i++) {
      filters[i].enabled = false;
    }
    this.setState({
      canvas,
      selectedFilters: [],
      image: null,
      filters,
      sliders,
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
    let filters = [...this.state.filters];
    for (let i = 0; i < filters.length; i++) {
      filters[i].enabled = false;
    }
    this.setState({
      canvas,
      sliders,
      selectedFilters: [],
      filters,
    });
  };

  handleSave = () => {
    let image = this.state.canvas._objects[0];
    let url = this.state.canvas.toDataURL({
      top: image.top,
      left: image.left,
      width: image.width * image.scaleX,
    });
    let element = document.createElement("a");
    element.href = url;
    element.download = "image.png";
    element.click();
  };

  handleSliderChange = (slider, value) => {
    let sliders = [...this.state.sliders];
    let index = sliders.findIndex((s) => s === slider);
    sliders[index].value = value;
    this.setState({
      sliders,
    });
  };

  handleFilterToggle = (e, filter) => {
    e.preventDefault();
    let filters = [...this.state.filters];
    let index = filters.findIndex((f) => f === filter);
    filters[index].enabled = !filters[index].enabled;
    this.setState({
      filters,
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
            selectedFilters={this.state.selectedFilters}
            filters={this.state.filters}
            sliders={this.state.sliders}
            handleCanvasMount={this.handleCanvasMount}
          />
          <Controls
            img={this.state.image}
            sliders={this.state.sliders}
            filters={this.state.filters}
            handleFilterToggle={this.handleFilterToggle}
            handleClearCanvas={this.handleClearCanvas}
            handleResetImage={this.handleResetImage}
            handleSliderChange={this.handleSliderChange}
            handleSave={this.handleSave}
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
