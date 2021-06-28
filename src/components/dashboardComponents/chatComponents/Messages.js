import React from "react";
import { useSocket } from "../../contexts/SocketContext";
import Message from "./Message";
import "./css/Messages.css";

const Messages = () => {
  const { messages } = useSocket();

  return (
    <div className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
