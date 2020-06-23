import React from "react";
import { Row } from "reactstrap";
import { RiImageAddLine } from "react-icons/ri";
import "./Upload.css";

export default ({ onChange }) => {
  return (
    <Row className="justify-content-center mt-5">
      <label for="upload-file">
        <RiImageAddLine className="text-light" id="upload-button" />
      </label>
      <input
        type="file"
        id="upload-file"
        onChange={onChange}
        accept="image/png, image/jpeg"
      />
    </Row>
  );
};
