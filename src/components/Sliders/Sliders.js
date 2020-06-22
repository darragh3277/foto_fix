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
    name: "Saturation",
    control: "saturation",
    min: -1,
    max: 1,
    step: 0.1,
    defaultValue: 0,
  },
  {
    id: 5,
    name: "Pixelate",
    control: "blocksize",
    min: 2,
    max: 20,
    step: 1,
    defaultValue: 2,
  },
];

export default ({ handleSliderChange, sliderValues }) => {
  let sliderComponents = sliders.map((slider) => {
    let index = sliderValues.findIndex((s) => s[slider.name] !== undefined);
    let value = sliderValues[index][slider.name];
    return (
      <Col key={slider.id} xs={12} sm={6} md={4} lg={3}>
        <Slider
          slider={slider}
          handleSliderChange={handleSliderChange}
          value={value}
        />
      </Col>
    );
  });
  return <>{sliderComponents}</>;
};
