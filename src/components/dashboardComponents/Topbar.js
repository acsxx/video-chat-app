import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="topbar">
      <Button color="secondary" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
    </div>
  );
};

export default Topbar;
