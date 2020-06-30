import React, { Component } from "react";
import Canvas from "./components/Canvas/Canvas";
import Controls from "./components/Controls/Controls";
import Upload from "./components/Upload/Upload";
import { sliders, filters } from "./filters/Filters";
import { Container } from "reactstrap";
import { fabric } from "fabric";
import "./App.css";

const textureSize = 2048;
const previewImageSize = 100;

class App extends Component {
  constructor() {
    super();
    this.selectedIndex = null;
    this.state = {
      showModal: !true,
      image: null,
      previewImage: null,
      loading: false,
      filters,
      sliders,
    };
  }

  //resize the image if one of the sides of the image exceeds the max texture size
  //if the image requires resizing, create a canvas element but don't attach to DOM
  //size the canvas with the largest size being equal to the max texture size
  //then scale the image down to the correct size when adding to the canvas
  resizeImage = (maxSize, imageUrl) => {
    return new Promise((resolve) => {
      let image = new Image();
      image.src = imageUrl;
      image.onload = (img) => {
        //check if resizing is required
        if (Math.max(img.target.width, img.target.height) > maxSize) {
          //create canvas
          let canvas = document.createElement("canvas");
          //scale image
          if (img.target.height >= img.target.width) {
            canvas.height = maxSize;
            canvas.width = (maxSize / img.target.height) * img.target.width;
          } else {
            canvas.width = maxSize;
            canvas.height = (maxSize / img.target.width) * img.target.height;
          }
          //draw to canvas
          let context = canvas.getContext("2d");
          context.drawImage(img.target, 0, 0, canvas.width, canvas.height);
          //assign new image url
          resolve(context.canvas.toDataURL());
        }
        resolve(imageUrl);
      };
    });
  };

  handleImageUpload = async (e) => {
    if (e.target.files.length < 1) return;
    this.setState({
      loading: true,
    });
    let objectUrl = URL.createObjectURL(e.target.files[0]);
    //resize if needed
    let imageUrl = await this.resizeImage(textureSize, objectUrl);
    let previewImageUrl = await this.resizeImage(previewImageSize, objectUrl);
    fabric.Image.fromURL(imageUrl, (image) => {
      fabric.Image.fromURL(previewImageUrl, (previewImage) => {
        this.setState({
          image,
          previewImage,
          showModal: false,
          loading: false,
        });
      });
    });
  };

  handleClearCanvas = () => {
    let sliders = this.state.sliders;
    for (let i = 0; i < sliders.length; i++) {
      sliders[i].value = sliders[i].defaultValue;
    }
    let filters = this.state.filters;
    for (let i = 0; i < filters.length; i++) {
      filters[i].enabled = false;
    }
    this.setState({
      image: null,
      previewImage: null,
      loading: false,
      filters,
      sliders,
    });
  };

  handleResetImage = () => {
    let sliders = this.state.sliders;
    for (let i = 0; i < sliders.length; i++) {
      sliders[i].value = sliders[i].defaultValue;
    }
    let filters = this.state.filters;
    for (let i = 0; i < filters.length; i++) {
      filters[i].enabled = false;
    }
    this.setState({
      sliders,
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
    let sliders = this.state.sliders;
    let index = sliders.findIndex((s) => s === slider);
    sliders[index].value = value;
    this.setState({
      sliders,
    });
  };

  handleFilterToggle = (filter, selectedIndex) => {
    this.selectedIndex = selectedIndex;
    let filters = this.state.filters;
    let index = filters.findIndex((f) => f === filter);
    filters[index].enabled = !filters[index].enabled;
    this.setState({
      filters,
    });
  };

  render = () => {
    return (
      <>
        <Container
          fluid
          id="main-container"
          className="min-vh-100 bg-dark d-flex flex-column p-0"
        >
          {/* Header */}
          <nav className="navbar navbar-dark bg-dark shadow border-bottom border-dark">
            <span className="navbar-brand mb-0 h1">FotoFix</span>
          </nav>
          {/* Canvas */}
          <Canvas
            image={this.state.image}
            filters={this.state.filters}
            sliders={this.state.sliders}
          />
          {/* Controls */}
          <Controls
            image={this.state.previewImage}
            loading={this.state.loading}
            sliders={this.state.sliders}
            filters={this.state.filters}
            handleFilterToggle={this.handleFilterToggle}
            handleClearCanvas={this.handleClearCanvas}
            handleResetImage={this.handleResetImage}
            handleSliderChange={this.handleSliderChange}
            handleSave={this.handleSave}
            selectedIndex={this.selectedIndex}
          />
          <Upload
            showModal={this.state.showModal}
            handleImageUpload={this.handleImageUpload}
            loading={this.state.loading}
          />
        </Container>
      </>
    );
  };
}

export default App;
