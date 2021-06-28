import React from "react";
import {Modal,Button} from "react-bootstrap"
import ChangeEmail from "./settingsComponents/ChangeEmail";
import ChangePassword from "./settingsComponents/ChangePassword";
import SetUsername from "./settingsComponents/SetUsername";

export default function Settings(props) {
  return (
    <div className="container">
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SetUsername />
        <ChangeEmail />
        <ChangePassword />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  
    </div>
  );
}
