import React from 'react'
//import {useHistory} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMicrophone,faVideo, faMicrophoneSlash, faVideoSlash} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap"
import {useSocket} from "../contexts/SocketContext"

function Controls() {
    const {muteUnmute,mute, playStop, video} = useSocket();

    return (
        <div className="Controls">
            {
                mute
                ?
                <Button onClick={muteUnmute} variant="outline-success"><FontAwesomeIcon icon={faMicrophone} className="mr-2" /></Button>
                :
                <Button onClick={muteUnmute} variant="outline-success"><FontAwesomeIcon icon={faMicrophoneSlash} className="mr-2" /></Button>
            }
            {
                video
                ?
                <Button onClick={playStop} variant="outline-success"><FontAwesomeIcon icon={faVideo} className="mr-2" /></Button>
                :
                <Button onClick={playStop} variant="outline-success"><FontAwesomeIcon icon={faVideoSlash} className="mr-2" /></Button>
            }
            {/* <Button variant="outline-danger" onClick={leaveRoom}><FontAwesomeIcon icon={faUserTimes} className="mr-2" /></Button> */}
        </div>
    )


}

export default Controls
