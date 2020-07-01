import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Upload.css";

const spinner = () => {
  return (
    <>
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-light">Loading...</p>
    </>
  );
};

const uploadButton = (handleImageUpload) => {
  return (
    <form>
      <span className="btn btn-primary btn-sm btn-file">
        Upload
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/png, image/jpeg"
        />
      </span>
    </form>
  );
};

export default ({ showModal, handleImageUpload, loading }) => {
  let display = loading ? spinner() : uploadButton(handleImageUpload);
  return (
    <Modal isOpen={showModal}>
      <ModalHeader className="bg-dark text-light border-bottom border-secondary">
        New Image
      </ModalHeader>
      <ModalBody className="bg-dark text-light">
        Welcome to FotoFix, a web app for editing your images. To get started
        click the upload button and choose an image.
      </ModalBody>
      <ModalFooter className="bg-dark border-top border-dark">
        {display}
      </ModalFooter>
    </Modal>
  );
};
