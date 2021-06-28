import React from "react";
import { useSocket } from "../contexts/SocketContext";
//import {useAuth} from "../contexts/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Modal, Button } from "react-bootstrap";
export default function AuditLogs(props) {
  const { logs, users, roomID } = useSocket();
  const Item = logs.map((log, i) => (
    <li key={i}>
      {log}
      <hr />
    </li>
  ));
  const Users = users.map((user, i) => <li key={i}>{user.name}</li>);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header closeButton>      
        <Modal.Title id="contained-modal-title-vcenter">
        Audit Logs
        </Modal.Title>  
      </Modal.Header>
      <Modal.Body>
      
        <p>Users in this room:</p>
        <ul>{Users}</ul>
        
        <p>Logs:</p>
        <ul>{Item}</ul>
      </Modal.Body>
      <Modal.Footer>
      <CopyToClipboard text={roomID}>
          <Button variant="outline-warning">
           <FontAwesomeIcon icon={faCopy} className="mr-2" /><span> Copy Room ID</span>
          </Button>
        </CopyToClipboard>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
