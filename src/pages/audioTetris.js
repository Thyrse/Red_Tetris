import React, { useState, useEffect, useRef } from 'react'
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import tetrisgame from "../utils/tetrisgame.mp3"

const AudioTetris = () => {
    const [mute, setMute] = useState(false);
    const myRef = useRef();

    useEffect(() => {
        playTetrisAudio();
    }, [])

    const playTetrisAudio = () => {
        // console.log("play")
        myRef.current.play();
        setMute(true);
    }

    const pauseTetrisAudio = () => {
        // console.log("pause")
        myRef.current.pause();
        setMute(false);
    }

    return (
        <div>
            <audio ref={myRef} src={tetrisgame} autoPlay={true}/>
            { !mute ? 
                <IconButton className={"audioWrapper"} onClick={() => playTetrisAudio()} disableRipple>
                    <VolumeOff className={"audioWrapper icon"} style={{ backgroundColor: 'transparent' }} color="secondary"/>
                </IconButton>
            :
                <IconButton className={"audioWrapper"} onClick={() => pauseTetrisAudio()} disableRipple>
                        <VolumeUp className={"audioWrapper icon"} style={{ backgroundColor: 'transparent' }} color="secondary"/>
                </IconButton>
            }
        </div>
    )
}

export default AudioTetris;
