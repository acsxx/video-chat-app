import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import Topbar from "./Topbar";
import PrivateRoute from "../PrivateRoute"
import CreateRoom from "./CreateRoom"
import Room from "./videoComponents/Room"
const Content = ({ sidebarIsOpen, toggleSidebar}) => {
 

  return(
    <Container fluid className={classNames("content", { "is-open": sidebarIsOpen })}>
      <Topbar toggleSidebar={toggleSidebar} />
      <PrivateRoute path="/dashboard" component = {CreateRoom}/>
      <PrivateRoute path="/room" component = {Room}/>
    </Container>
    );
}

export default Content;
