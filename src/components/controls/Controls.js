import React from "react";
import FilterStrip from "../FilterStrip/FilterStrip";
import Sliders from "../Sliders/Sliders";
import { Row, Button } from "reactstrap";

export default ({
  img,
  handleFilterToggle,
  handleResetImage,
  handleClearCanvas,
  handleSliderChange,
  filters,
  sliders,
}) => {
  return (
    <>
      <FilterStrip
        img={img}
        handleFilterToggle={handleFilterToggle}
        filters={filters}
      />
      <Row className="mt-2">
        <Sliders handleSliderChange={handleSliderChange} sliders={sliders} />
      </Row>
      <Row className="justify-content-center mt-2">
        <Button
          onClick={handleClearCanvas}
          outline
          color="danger"
          size="sm"
          className="m-1"
        >
          New Image
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
      </Row>
    </>
  );
};
