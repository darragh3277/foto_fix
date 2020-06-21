import React, { Component, createRef } from "react";
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
    this.test = createRef();
    this.canvasRef = React.createRef();
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

  componentDidUpdate = () => {
    console.log(this.test);
    console.log(this.canvasRef);
    if (this.state.image === null) return;
    this.canvas = new fabric.Canvas("canvas", {
      selection: false,
      hoverCursor: "context-menu",
      backgroundColor: "#2b2e31",
    });
    fabric.Image.fromURL(this.state.image, (img) => {
      img.set({ selectable: false });
      img.scaleToWidth(300);
      img.scaleToHeight(150);
      for (let i = 0; i < this.state.filtersSelected.length; i++) {
        img.filters.push(this.state.filtersSelected[i]);
      }
      img.applyFilters();
      this.canvas.add(img);
      this.canvas.centerObject(img);
    });
  };

  getRefDeets = () => {
    console.log("hi", this.test, this.canvasRef);
  };

  render = () => {
    let display = <Upload onChange={this.handleImageUpload} />;
    if (this.state.image !== null) {
      display = (
        <>
          <Canvas ref={this.canvasRef} />
          <Controls filters={this.filterOptions} />
        </>
      );
    }
    return (
      <Container fluid className="vh-100 bg-dark">
        <Row className="justify-content-center pt-3" onClick={this.getRefDeets}>
          <Col xs={8}>
            <h3 ref={this.test}>teset</h3>
            <Header />
            {display}
          </Col>
        </Row>
      </Container>
    );
  };
}

export default App;
