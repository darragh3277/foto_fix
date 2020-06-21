import React from "react";
import FilterStrip from "../FilterStrip/FilterStrip";
import { Row } from "reactstrap";

export default ({ filters }) => {
  console.log(filters);
  return (
    <Row className="bg-light justify-content-center p-2 mt-5">
      <FilterStrip filters={filters} />
    </Row>
  );
};
