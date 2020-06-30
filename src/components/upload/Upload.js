import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Upload.css";

export default ({ showModal, handleImageUpload }) => {
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
        <span class="btn btn-primary btn-sm btn-file">
          Upload
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/png, image/jpeg"
          />
        </span>
      </ModalFooter>
    </Modal>
  );
};
