import React from "react";
import "./FilterPreview.css";

export default ({ name }) => {
  return (
    <>
      <canvas
        className="border rounded"
        height="100%"
        width="100%"
        id={"canvas_" + name}
      />
      <p className="text-center mb-0 filter-preview-title">{name}</p>
    </>
  );
};
