import React from "react";
import FilterPreview from "../FilterPreview/FilterPreview";
import { Row, Col } from "reactstrap";
import Flickity from "react-flickity-component";
import "./Flickity.css";

const flickityOptions = {
  initialIndex: 1,
  pageDots: false,
  contain: true,
  prevNextButtons: false,
};

const fliterPreviews = (filters, img, handleFilterToggle) => {
  return filters.map((filter, i) => {
    return (
      <FilterPreview
        key={i}
        filter={filter}
        handleFilterToggle={handleFilterToggle}
        img={img}
        selectedIndex={i}
      />
    );
  });
};

export default ({ img, filters, handleFilterToggle, selectedIndex }) => {
  if (selectedIndex === null) {
    selectedIndex = filters.length / 2;
  }
  flickityOptions.initialIndex = selectedIndex;
  return (
    <Row>
      <Col className="mt-5">
        <Flickity
          className={"carousel"} // default ''
          elementType={"div"} // default 'div'
          options={flickityOptions} // takes flickity options {}
          disableImagesLoaded={false} // default false
          reloadOnUpdate // default false
          static // default false
        >
          {fliterPreviews(filters, img, handleFilterToggle)}
        </Flickity>
      </Col>
    </Row>
  );
};
