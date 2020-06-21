import React from "react";
import { Row } from "reactstrap";
import "./Canvas.css";

export default React.forwardRef((_props, ref) => {
  return (
    <Row className="justify-content-center" ref={ref}>
      <canvas className="border rounded-top" id="canvas" />
    </Row>
  );
});
