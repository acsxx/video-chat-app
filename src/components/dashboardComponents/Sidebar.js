/* eslint-disable no-template-curly-in-string */
import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faCog,
  faHome,
  //faComments,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext"
import {Button} from "react-bootstrap"
import Profile from "./Profile"
//import Chat from "./Chat"
import Settings from "./Settings"
import Controls from "./Controls"
import AuditLogs from "./AuditLogs"
function SideBar  ({ isOpen }){

  const {logout, name} = useAuth()
  const history = useHistory()
  const [modalShowProfile, setModalShowProfile] = useState(false);
  const [modalShowSettings, setModalShowSettings] = useState(false);
  const [modalShowLog, setModalShowLog] = useState(false);
  //const [modalShowChat, setModalShowChat] = useState(false);
  async function handleLogout(){
    try {
      await logout()
      history.push("/login")
    } catch (error) {
      console.log(error)
    }
  }
 
  return (

    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
          
        <h3>Video Chat App</h3>
      </div>
  
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <p>{name ? `Welcome ${name} ! `: "user-name"}</p>
          <NavItem>
            <NavLink tag={Link} to="/dashboard" style={{marginBottom: "10px"}}>
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Create Room +
            </NavLink>
          </NavItem>
          <NavItem>
          <NavLink tag={Link} to="/room" style={{marginBottom: "15px"}}>
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Room
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <Button variant="outline-success" onClick={() => setModalShowChat(true)} style={{marginLeft: "30px"}}>
              <FontAwesomeIcon icon={faComments} className="mr-2" />
              Chat
            </Button>
          </NavItem> */}
          <NavItem>
            <Button variant="outline-success" onClick={() => setModalShowProfile(true)} style={{marginLeft: "30px"}}>
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </Button>
          </NavItem>
          <NavItem>
            <Button variant="outline-success" onClick={() => setModalShowLog(true)} style={{marginLeft: "30px"}}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Audit Log
            </Button>
          </NavItem>
          <NavItem>
            <Button variant="outline-success" onClick={() => setModalShowSettings(true)} style={{marginLeft: "30px"}}>
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings
            </Button>
          </NavItem>
          <NavItem>
            <Button variant="outline-danger" tag={Link} onClick={handleLogout} to="#" style={{marginLeft: "30px"}}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </Button>
          </NavItem>
        </Nav>
      <Controls/>
      </div>

      {/* <Chat
        show={modalShowChat}
        onHide={() => setModalShowChat(false)}
      /> */}
      <Profile
        show={modalShowProfile}
        onHide={() => setModalShowProfile(false)}
      />
      <AuditLogs
        show={modalShowLog}
        onHide={() => setModalShowLog(false)}
      />
      <Settings
        show={modalShowSettings}
        onHide={() => setModalShowSettings(false)}
      />

    </div>
  );

  
}

export default SideBar;
