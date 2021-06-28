import React, {useRef, useEffect} from "react"
import styled from "styled-components"
const StyledVideo = styled.video`
    height: 300px;
    width: 50%;
    padding: 10px
`;
const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    },[props.peer]);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}

export default Video
