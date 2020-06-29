import React from "react";
import FilterStrip from "../FilterStrip/FilterStrip";
import Sliders from "../Sliders/Sliders";
import { Row, Button } from "reactstrap";

export default ({
  image,
  handleFilterToggle,
  handleResetImage,
  handleClearCanvas,
  handleSliderChange,
  handleSave,
  selectedIndex,
  filters,
  sliders,
}) => {
  return (
    <>
      <FilterStrip
        image={image}
        handleFilterToggle={handleFilterToggle}
        filters={filters}
        selectedIndex={selectedIndex}
      />
      <Row className="mt-2">
        <Sliders handleSliderChange={handleSliderChange} sliders={sliders} />
      </Row>
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
          outline
          color="danger"
          size="sm"
          className="m-1"
        >
          New Image
        </Button>
      </Row>
    </>
  );
};
