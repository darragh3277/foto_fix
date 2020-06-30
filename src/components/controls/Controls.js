import React, { useState } from "react";
import FilterStrip from "../FilterStrip/FilterStrip";
import Sliders from "../Sliders/Sliders";
import { Row, Button } from "reactstrap";

const controlPanel = (
  filterActive,
  image,
  handleFilterToggle,
  handleSliderChange,
  selectedIndex,
  filters,
  sliders
) => {
  if (filterActive) {
    return (
      <FilterStrip
        image={image}
        handleFilterToggle={handleFilterToggle}
        filters={filters}
        selectedIndex={selectedIndex}
      />
    );
  } else {
    return (
      <Row className="m-0">
        <Sliders handleSliderChange={handleSliderChange} sliders={sliders} />
      </Row>
    );
  }
};

const controlButtons = ({
  handleSave,
  handleResetImage,
  handleClearCanvas,
}) => {
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
  loading,
}) => {
  const [filterActive, setFilterActive] = useState(true);
  let display = null;
  if (loading === false && image !== null) {
    display = controlPanel(
      filterActive,
      image,
      handleFilterToggle,
      handleSave,
      selectedIndex,
      filters,
      sliders
    );
  }
  return (
    <>
      <div
        className="btn-group border border-dark"
        role="group"
        aria-label="Basic example"
      >
        <button
          type="button"
          className={
            "btn btn-secondary rounded-0 " + (filterActive && "active")
          }
          onClick={() => setFilterActive(true)}
        >
          Filter
        </button>
        <button
          type="button"
          className={
            "btn btn-secondary rounded-0 " + (!filterActive && "active")
          }
          onClick={() => setFilterActive(false)}
        >
          Edit
        </button>
      </div>
      <div id="controls-wrapper" className="border-top border-dark">
        {display}
      </div>
      {controlButtons(handleResetImage, handleClearCanvas, handleSliderChange)}
    </>
  );
};
