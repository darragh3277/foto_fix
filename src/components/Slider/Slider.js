import React from "react";
import { Row, Col } from "reactstrap";

export default ({ slider, handleSliderChange }) => {
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
          defaultValue={slider.defaultValue}
          id={slider.name + "Range"}
          name={slider.name + "Range"}
          onChange={(e) => handleSliderChange(slider, e.target.value)}
        />
      </Col>
    </Row>
  );
};
