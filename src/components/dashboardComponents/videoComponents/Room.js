/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Video from "./Video";
import { useSocket } from "../../contexts/SocketContext";
import styled from "styled-components"
import Chat from "../chatComponents/Chat"

const StyledVideo = styled.video`
    height: 300px;
    width: 50%;
    padding: 10px
`;
const Room = () => {
  const { peers, userVideo, playVideo} = useSocket();
  useEffect(() => {
    playVideo();
  }, []);
  
  return (
    <div className="mainRoom">
        <div className="mainVideos">
          <StyledVideo muted ref={userVideo} autoPlay playsInline />
          {peers.map((peer) => {
            return <Video key={peer.peerID} peer={peer.peer} />;
          })}        
        </div>
        <div className="mainChat">
          <Chat/>
        </div>
   
    </div>
  );
};

export default Room;
