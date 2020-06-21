import React from "react";
import FilterStrip from "../FilterStrip/FilterStrip";
import { Row, Button } from "reactstrap";

export default ({
  filters,
  img,
  handleFilterToggle,
  handleResetImage,
  handleClearCanvas,
}) => {
  return (
    <>
      <Row className="justify-content-center p-2 mt-2">
        <FilterStrip
          filters={filters}
          img={img}
          handleFilterToggle={handleFilterToggle}
        />
      </Row>
      <Row className="justify-content-center mt-2">
        <Button
          onClick={handleClearCanvas}
          outline
          color="danger"
          size="sm"
          className="mr-1"
        >
          New Image
        </Button>
        <Button
          onClick={handleResetImage}
          outline
          color="light"
          size="sm"
          className="ml-1"
        >
          Reset
        </Button>
      </Row>
    </>
  );
};
