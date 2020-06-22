import React from "react";
import { fabric } from "fabric";
import FilterPreview from "../FilterPreview/FilterPreview";
import "./FilterStrip.css";
import { Row } from "reactstrap";

const filterOptions = [
  {
    id: 1,
    name: "Grayscale",
    function: new fabric.Image.filters.Grayscale(),
  },
  { id: 2, name: "Vintage", function: new fabric.Image.filters.Vintage() },
  { id: 3, name: "Sepia", function: new fabric.Image.filters.Sepia() },
];

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
