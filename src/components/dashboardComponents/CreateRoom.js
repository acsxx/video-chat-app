import React,{useRef} from "react";
import { v4 as uuidv4 } from 'uuid';
import {useSocket} from "../contexts/SocketContext"
import {useAuth} from "../contexts/AuthContext"

function CreateRoom(props) {

    const getID = useRef("");
    const {setRoomID} = useSocket();
    const {setUsername,name,currentUser} = useAuth()
    
    function setName(name){
      if(name){
        return
      }else{
        setUsername(currentUser.displayName)
      }
    }

    function createRoom(){
        const id = uuidv4()
        setRoomID(id);
        setName(name)
        console.log(currentUser.displayName)
        props.history.push(`/room`);
    }

    function joinRoom(){
       const roomID = getID.current.value
       setRoomID(roomID);
       props.history.push(`/room`);
       console.log(roomID)
    }
     
  return (
    <div>

    <div className="row">
      <div className="col-md-6 m-auto">
        <div
          className="card card-body text-center"
          style={{display: "block", margin: "10px"}}
        >
          <h3>Join the Call !</h3>
          
            <div className="m-4">
          <p>{name || "Username"}</p>
           <input
              type="text"
              id="username"
              name="username"
              className="form-group w-50"
              placeholder={"Enter Username"}
              onChange={(e)=> setUsername(e.target.value)}
            /> 
          </div> 
          <hr/>
          <button className="btn btn-secondary w-25 m-3" onClick={createRoom}>
            Create New Room
          </button>
          <h6>OR</h6>
          <form onSubmit = {joinRoom}>
            <input
              type="text"
              ref={getID}
              id="roomId"
              name="roomId"
              className="form-group w-50 m-2"
              placeholder="Enter Room Id"
            />
            <button className="btn btn-primary" type="submit" onClick={joinRoom}>
              Join New Room
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CreateRoom;
