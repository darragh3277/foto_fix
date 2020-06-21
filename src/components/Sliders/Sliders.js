import React from "react";
import { Col } from "reactstrap";
import Slider from "../Slider/Slider";
import "./Sliders.css";

const sliders = [
  {
    id: 1,
    name: "Brightness",
    control: "brightness",
    min: 0,
    max: 10,
  },
  {
    id: 2,
    name: "Contrast",
    control: "contrast",
    min: 0,
    max: 10,
  },
  {
    id: 3,
    name: "Blur",
    control: "blur",
    min: 0,
    max: 10,
  },
  {
    id: 4,
    name: "Pixelate",
    control: "blocksize",
    min: 10,
    max: 1000,
  },
];

export default ({ handleSliderChange }) => {
  let sliderComponents = sliders.map((slider) => {
    return (
      <Col key={slider.id} xs={12} md={6}>
        <Slider slider={slider} handleSliderChange={handleSliderChange} />
      </Col>
    );
  });
  return <>{sliderComponents}</>;
};
