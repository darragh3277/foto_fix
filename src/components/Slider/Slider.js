import React from "react";
import { Row, Col } from "reactstrap";

export default ({ slider, handleSliderChange, value }) => {
  return (
    <Row>
      <Col>
        <label
          htmlFor={slider.name + "Range"}
          className="text-light slider mr-1"
        >
          {slider.name}:
        </label>
      </Col>
      <Col>
        <input
          type="range"
          min={slider.min}
          max={slider.max}
          step={slider.step}
          value={value}
          id={slider.name + "Range"}
          name={slider.name + "Range"}
          onChange={(e) => handleSliderChange(slider, e.target.value)}
        />
      </Col>
    </Row>
  );
};
