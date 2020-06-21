import React from "react";
import { Row, Col } from "reactstrap";
import FilterPreview from "../FilterPreview/FilterPreview";

export default ({ filters }) => {
  let filterComponents = filters.map((filter) => {
    return (
      <Col xs={4} key={filter.id}>
        <FilterPreview name={filter.name} />
      </Col>
    );
  });
  return <Row className="justify-content-center">{filterComponents}</Row>;
};
