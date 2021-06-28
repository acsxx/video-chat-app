import React, { useState} from "react";
import { BrowserRouter as Router} from "react-router-dom";
import SideBar from "./dashboardComponents/Sidebar";
import Content from "./dashboardComponents/Content";
import {SocketProvider} from "./contexts/SocketContext"
import "./css/Dashboard.css";

const Dashboard = () => {

  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  return (
    <Router>
      <SocketProvider>
        <div className="App wrapper">
          <SideBar isOpen={sidebarIsOpen} />
          <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}/>
        </div>
      </SocketProvider>
    </Router>
    
  );
};

export default Dashboard;
