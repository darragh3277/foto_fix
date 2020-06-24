import React from "react";
import { Row } from "reactstrap";
import { RiImageAddLine } from "react-icons/ri";
import "./Upload.css";

export default ({ onChange, fileSizeWarning }) => {
  return (
    <>
      <Row className="justify-content-center mt-5">
        <label htmlFor="upload-file">
          <RiImageAddLine id="upload-button" />
        </label>
        <input
          type="file"
          id="upload-file"
          onChange={onChange}
          accept="image/png, image/jpeg"
        />
      </Row>
      {fileSizeWarning && (
        <p className="text-danger text-center" id="file-size-warning">
          File must be less than 1MB
        </p>
      )}
    </>
  );
};
