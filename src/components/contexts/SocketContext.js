import React, { createContext, useState, useRef, useContext } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useAuth } from "./AuthContext";
const socket = io("https://video-meet-app.herokuapp.com/");
//const socket = io("http://localhost:5000");

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}
const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const SocketProvider = ({ children }) => {
  const [peers, setPeers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { name, currentUser } = useAuth();
  const [roomID, setRoomID] = useState("");
  const [mute, setMute] = useState(true);
  const [video, setVideo] = useState(true);
  const logsArr = [];
  const usersArr = useRef([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  function playVideo(roomID) {
    if (roomID && socket.id) {
      navigator.mediaDevices
        .getUserMedia({ video: videoConstraints, audio: true })
        .then((stream) => {
          userVideo.current.srcObject = stream;
          socket.emit("join room", roomID, name, currentUser.email);

          socket.on("all users", (users) => {
            logsArr.push(`Room id: ${roomID}`);
            logsArr.push(`User Connected:"${name} (Me)"`);
            setLogs(logsArr);

            const peers = [];

            users.forEach((user) => {

              usersArr.current.push({
                name: user.name,
                email: user.email,
                id: socket.id,
              });

              if (user.ID !== socket.id) {
                const peer = createPeer(user.ID, socket.id, stream);

                peersRef.current.push({
                  peerID: user.ID,
                  peer,
                });
                peers.push({
                  peerID: user.ID,
                  peer,
                });
              }
            });

            setUsers(usersArr.current);
            setPeers(peers);
          });

          socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
          });

          socket.on("user joined", (payload) => {
            logsArr.push(`User Connected:"${payload.name}"`);
            setLogs(logsArr);

            const peer = addPeer(payload.signal, payload.callerID, stream);

            usersArr.current.push({
              name: payload.name,
              email: payload.email,
              id: payload.callerID,
            });

            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            const peerObj = {
              peerID: payload.callerID,
              peer,
            };

            setUsers(usersArr.current);
            setPeers((users) => [...users, peerObj]);
          });

          socket.on("receiving returned signal", (payload) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id);
            item.peer.signal(payload.signal);
          });

          socket.on("user left", (user) => {
            logsArr.push(`User Left:"${user.name}"`);
            setLogs(logsArr);

            const users = usersArr.current.filter((u) => u.name !== user.name);
            usersArr.current = users;
            setUsers(users);

            const peerObj = peersRef.current.find((p) => p.peerID === user.ID);
            if (peerObj) {
              peerObj.peer.destroy();
            }
            const peers = peersRef.current.filter((p) => p.peerID !== user.ID);
            peersRef.current = peers;
            setPeers(peers);
          });
        });
    } else {
      alert("Please crate or join a room !!");
    }
  }

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', {message,roomID}, () => setMessage(''));
    } 
  } 

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sending signal", {
        userToSignal,
        callerID,
        name,
        signal,
      });
    });

    return peer;
  }
  
  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function muteUnmute() {
    if (mute) {
      userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
      setMute(false);
    } else {
      setMute(true);
      userVideo.current.srcObject.getAudioTracks()[0].enabled = true;
    }
  }
  function playStop() {
    let enabled = userVideo.current.srcObject.getVideoTracks()[0].enabled
     if(enabled){
      userVideo.current.srcObject.getVideoTracks()[0].enabled = false
      setVideo(false)
    }
    else{
      setVideo(true)
      userVideo.current.srcObject.getVideoTracks()[0].enabled = true
    } 
  }
  return (
    <SocketContext.Provider
      value={{
        setRoomID,
        userVideo,
        peers,
        roomID,
        playVideo,
        muteUnmute,
        mute,
        playStop,
        logs,
        users,
        video,
        sendMessage,
        messages,
        setMessage,
        message
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
