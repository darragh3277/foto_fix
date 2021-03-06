import React from "react";
import { Col, Row } from "reactstrap";
import Slider from "../Slider/Slider";
import "./Sliders.css";

export default ({ handleSliderChange, sliders }) => {
  let sliderComponents = sliders.map((slider) => {
    return (
      <Col key={slider.id} xs={12} sm={6} md={4} lg={3}>
        <Slider slider={slider} handleSliderChange={handleSliderChange} />
      </Col>
    );
  });
  return (
    <Row className="mt-2 justify-content-center">
      <Col xs={8}>
        <Row>{sliderComponents}</Row>
      </Col>
    </Row>
  );
};
