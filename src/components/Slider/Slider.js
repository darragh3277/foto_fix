import React from "react";
import { Row, Col } from "reactstrap";

export default ({ slider }) => {
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
          min="0"
          max="10"
          defaultValue="0"
          id={slider.name + "Range"}
          name={slider.name + "Range"}
        />
      </Col>
    </Row>
  );
};
