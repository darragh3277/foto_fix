import React from "react";
import FilterPreview from "../FilterPreview/FilterPreview";
import { filterOptions } from "../../filters/Filters";
import { Row } from "reactstrap";
import "./FilterStrip.css";

export default ({ img, selectedFilters, handleFilterToggle }) => {
  const slides = filterOptions.map((filter, i) => {
    return (
      <FilterPreview
        key={i}
        filter={filter}
        img={img}
        handleFilterToggle={handleFilterToggle}
        selectedFilters={selectedFilters}
      />
    );
  });
  return <Row className="p-2 mt-2 justify-content-md-center">{slides}</Row>;
};
