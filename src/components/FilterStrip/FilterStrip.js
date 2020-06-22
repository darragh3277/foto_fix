import React, { useState } from "react";
import { Row, Carousel, CarouselItem, CarouselControl } from "reactstrap";
import { fabric } from "fabric";
import FilterPreview from "../FilterPreview/FilterPreview";
import "./FilterStrip.css";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const itemsPerSlide = 2;
  const numSlides = filterOptions.length / itemsPerSlide;

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === filterOptions.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? filterOptions.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const filterComponents = filterOptions.map((filter) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={filter.id}
      >
        <FilterPreview
          filter={filter}
          img={img}
          handleFilterToggle={handleFilterToggle}
          selectedFilters={selectedFilters}
        />
      </CarouselItem>
    );
  });

  return (
    <>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={false}
        className="col p-0"
      >
        {filterComponents}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
          className="col p-0"
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
          className="col p-0"
        />
      </Carousel>
    </>
  );
};
