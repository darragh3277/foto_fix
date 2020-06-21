import React from "react";
import { Col } from "reactstrap";
import { fabric } from "fabric";
import Slider from "../Slider/Slider";
import "./Sliders.css";

const sliders = [
  {
    id: 1,
    name: "Brightness",
    function: new fabric.Image.filters.Brightness({
      brightness: 0,
    }),
  },
  {
    id: 2,
    name: "Contrast",
    function: new fabric.Image.filters.Contrast({
      contrast: 0,
    }),
  },
  {
    id: 3,
    name: "Blur",
    function: new fabric.Image.filters.Blur({
      blur: 0,
    }),
  },
  {
    id: 4,
    name: "Pixelate",
    function: new fabric.Image.filters.Pixelate({
      blocksize: 0,
    }),
  },
];

export default () => {
  let sliderComponents = sliders.map((slider) => {
    return (
      <Col key={slider.id} xs={12} md={6}>
        <Slider slider={slider} />
      </Col>
    );
  });
  return <>{sliderComponents}</>;
};
