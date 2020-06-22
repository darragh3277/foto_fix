import React from "react";
import FilterStrip from "../FilterStrip/FilterStrip";
import Sliders from "../Sliders/Sliders";
import { Row, Button } from "reactstrap";

export default ({
  img,
  selectedFilters,
  sliderValues,
  handleFilterToggle,
  handleResetImage,
  handleClearCanvas,
  handleSliderChange,
  sliders,
}) => {
  return (
    <>
      <FilterStrip
        img={img}
        handleFilterToggle={handleFilterToggle}
        selectedFilters={selectedFilters}
      />
      <Row className="mt-2">
        <Sliders
          handleSliderChange={handleSliderChange}
          sliderValues={sliderValues}
          sliders={sliders}
        />
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
