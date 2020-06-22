import React from "react";
import FilterPreview from "../FilterPreview/FilterPreview";
import { Row } from "reactstrap";
import "./FilterStrip.css";

export default ({ img, filters, handleFilterToggle }) => {
  const slides = filters.map((filter, i) => {
    return (
      <FilterPreview
        key={i}
        filter={filter}
        img={img}
        handleFilterToggle={handleFilterToggle}
        filters={filters}
      />
    );
  });
  return <Row className="p-2 mt-2 justify-content-md-center">{slides}</Row>;
};
