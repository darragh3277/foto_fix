import React, { useState } from "react";
import FilterStrip from "./FilterStrip/FilterStrip";
import Sliders from "./Sliders/Sliders";
import ControlButtons from "./ControlButtons/ControlButtons";
import "./Controls.css";

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
    if (filterActive) {
      display = (
        <FilterStrip
          image={image}
          handleFilterToggle={handleFilterToggle}
          filters={filters}
          selectedIndex={selectedIndex}
        />
      );
    } else {
      display = (
        <Sliders handleSliderChange={handleSliderChange} sliders={sliders} />
      );
    }
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
      <ControlButtons
        handleResetImage={handleResetImage}
        handleClearCanvas={handleClearCanvas}
        handleSave={handleSave}
      />
    </>
  );
};
