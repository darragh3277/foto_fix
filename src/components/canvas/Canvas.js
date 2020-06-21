import React from "react";
import { Row } from "reactstrap";
import "./Canvas.css";

export default () => {
  return (
    <Row className="justify-content-center">
      <canvas className="border rounded-top" id="canvas" />
    </Row>
  );
};
