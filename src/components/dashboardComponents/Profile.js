import React from "react";
import { useAuth } from "../contexts/AuthContext";
import {Modal,Button} from "react-bootstrap"
import { useSocket } from "../contexts/SocketContext";

export default function Profile(props) {
  const { name } = useAuth();
  const {users} = useSocket()
  const me = users.filter(user => user.name === name)
  
    return (
      <div>
      {
        (me[0] !== undefined) &&
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="h5">User Name</p>
          <p className="h6">{me[0].name || "user-name"}</p>
          <hr/>
          <p className="h5">User ID</p>
          <p className="h6">{me[0].id}</p>
          <hr/>
          <p className="h5">Email</p>
          <p className="h6">{me[0].email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      }
      </div>
    );
  
  
}
