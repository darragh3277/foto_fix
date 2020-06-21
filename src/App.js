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
    this.filterOptions = [
      {
        id: 1,
        name: "Grayscale",
        function: new fabric.Image.filters.Grayscale(),
      },
      { id: 2, name: "Vintage", function: new fabric.Image.filters.Vintage() },
      { id: 3, name: "Sepia", function: new fabric.Image.filters.Sepia() },
    ];
    this.state = {
      image: null,
      filtersSelected: [],
    };
  }

  handleImageUpload = (e) => {
    if (e.target.files.length < 1) return;
    let url = URL.createObjectURL(e.target.files[0]);
    this.setState({
      image: url,
    });
  };

  handleClearCanvas = () => {
    this.canvas = null;
    this.setState({
      filtersSelected: [],
      image: null,
    });
  };

  handleResetImage = () => {
    this.setState({
      filtersSelected: [],
    });
  };

  handleFilterToggle = (filter) => {
    let index = this.state.filtersSelected.indexOf(filter);
    let filters = [...this.state.filtersSelected];
    if (index > -1) {
      filters.splice(index, 1);
    } else {
      filters.push(filter);
    }
    this.setState({
      filtersSelected: filters,
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
        for (let i = 0; i < this.state.filtersSelected.length; i++) {
          img.filters.push(this.state.filtersSelected[i].function);
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
            filters={this.filterOptions}
            img={this.state.image}
            handleFilterToggle={this.handleFilterToggle}
            handleClearCanvas={this.handleClearCanvas}
            handleResetImage={this.handleResetImage}
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
