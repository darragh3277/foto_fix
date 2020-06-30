import React, { useState } from "react";
import FilterStrip from "../FilterStrip/FilterStrip";
import Sliders from "../Sliders/Sliders";
import { Row, Button } from "reactstrap";

const emptyControlPanel = () => {
  return <div id="controls-wrapper" className="border-top border-dark"></div>;
};

const controlPanel = (
  image,
  handleFilterToggle,
  handleResetImage,
  handleClearCanvas,
  handleSliderChange,
  handleSave,
  selectedIndex,
  filters,
  sliders
) => {
  return (
    <div id="controls-wrapper" className="border-top border-dark">
      <FilterStrip
        image={image}
        handleFilterToggle={handleFilterToggle}
        filters={filters}
        selectedIndex={selectedIndex}
      />
      <Row className="m-0">
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
    </div>
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
  let display = emptyControlPanel();
  if (loading === false && image !== null) {
    display = controlPanel(
      image,
      handleFilterToggle,
      handleResetImage,
      handleClearCanvas,
      handleSliderChange,
      handleSave,
      selectedIndex,
      filters,
      sliders
    );
  }
  const [filterActive, setFilterActive] = useState(true);
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
      {display}
    </>
  );
};
