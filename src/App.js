import React, { Component } from "react";
import Canvas from "./components/canvas/Canvas";
import Header from "./components/header/Header";
import Dashboard from "./components/controls/Controls";
import Upload from "./components/upload/Upload";
import { Container, Row, Col } from "reactstrap";
import { fabric } from "fabric";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      filterOptions: [
        { name: "Grayscale", function: new fabric.Image.filters.Grayscale() },
        { name: "Vintage", function: new fabric.Image.filters.Vintage() },
        { name: "Sepia", function: new fabric.Image.filters.Sepia() },
      ],
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

  render = () => {
    let display = <Upload onChange={this.handleImageUpload} />;
    if (this.state.image !== null) {
      display = (
        <>
          <Canvas />
          <Dashboard />
        </>
      );
    }
    return (
      <Container fluid className="vh-100 bg-dark">
        <Row className="justify-content-center pt-3">
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
