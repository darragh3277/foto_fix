import React from "react";
import { Row, Col } from "reactstrap";
import { fabric } from "fabric";
import FilterPreview from "../FilterPreview/FilterPreview";

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
  let filterComponents = filterOptions.map((filter) => {
    return (
      <Col xs={4} key={filter.id}>
        <FilterPreview
          filter={filter}
          img={img}
          handleFilterToggle={handleFilterToggle}
          selectedFilters={selectedFilters}
        />
      </Col>
    );
  });
  return <Row className="justify-content-center">{filterComponents}</Row>;
};
