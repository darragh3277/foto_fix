import React from "react";
import { Col, Row, Button } from "reactstrap";

export default () => {
  return (
    <Row className="bg-dark justify-content-center p-2">
      <Col>
        <Button className="float-right" type="button" color="light">
          Upload
        </Button>
      </Col>
    </Row>
  );
};
