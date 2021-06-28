import React from "react";
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';

import './css/Chat.css';


const Chat = () => {

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar/>
          <Messages/>
          <Input/>
      </div>
    </div>
  );
}

export default Chat;
