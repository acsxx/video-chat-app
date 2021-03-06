import React from 'react';
import {useSocket} from "../../contexts/SocketContext"
import './css/Input.css';

const Input = () => {

  const {setMessage, sendMessage, message} = useSocket()

  return(
    <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
  );
}
export default Input;