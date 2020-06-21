import React from "react";
import { Row } from "reactstrap";
import { RiImageAddLine } from "react-icons/ri";
import "./Upload.css";

export default ({ onChange }) => {
  return (
    <>
      <Row className="justify-content-center ">
        <RiImageAddLine className="text-light" id="upload-button" />
      </Row>
      <Row className="justify-content-center mt-5">
        <div className="custom-file col-6">
          <label className="custom-file-label" htmlFor="upload-file">
            <input
              type="file"
              className="custom-file-input"
              id="upload-file"
              onChange={onChange}
              accept="image/png, image/jpeg"
            />
          </label>
        </div>
      </Row>
    </>
  );
};
