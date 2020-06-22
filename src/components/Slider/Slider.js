import React from "react";
import { Row, Col } from "reactstrap";

export default ({ slider, handleSliderChange }) => {
  return (
    <Row>
      <div className="form-group">
        <Col xs={12} sm={6} md={4}>
          <label
            htmlFor={slider.name + "Range"}
            className="text-light slider mr-1"
          >
            {slider.name}:
          </label>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <input
            type="range"
            min={slider.min}
            max={slider.max}
            step={slider.step}
            value={slider.value}
            id={slider.name + "Range"}
            name={slider.name + "Range"}
            onChange={(e) => handleSliderChange(slider, e.target.value)}
          />
        </Col>
      </div>
    </Row>
  );
};
