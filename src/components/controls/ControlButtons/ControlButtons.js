import React from "react";
import { Row, Button } from "reactstrap";

export default ({ handleResetImage, handleClearCanvas, handleSave }) => {
  return (
    <Row className="justify-content-center m-2">
      <Button
        onClick={handleSave}
        outline
        color="light"
        size="sm"
        className="m-1"
      >
        Save
      </Button>
      <Button
        onClick={handleResetImage}
        outline
        color="light"
        size="sm"
        className="m-1"
      >
        Reset
      </Button>
      <Button
        onClick={handleClearCanvas}
        color="danger"
        size="sm"
        className="m-1"
      >
        New Image
      </Button>
    </Row>
  );
};
