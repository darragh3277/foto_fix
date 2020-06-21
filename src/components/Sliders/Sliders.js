import React from "react";
import { Col } from "reactstrap";
import Slider from "../Slider/Slider";
import "./Sliders.css";

const sliders = [
  {
    id: 1,
    name: "Brightness",
    control: "brightness",
    min: -1,
    max: 1,
    step: 0.1,
    defaultValue: 0,
  },
  {
    id: 2,
    name: "Contrast",
    control: "contrast",
    min: -1,
    max: 1,
    step: 0.1,
    defaultValue: 0,
  },
  {
    id: 3,
    name: "Blur",
    control: "blur",
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 0,
  },
  {
    id: 4,
    name: "Pixelate",
    control: "blocksize",
    min: 2,
    max: 20,
    step: 1,
    defaultValue: 2,
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
