import React, { useState, useEffect, useRef } from "react";
import { VolumeOff, VolumeUp } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

import tetrisgame from "../utils/tetrisgame.mp3";

const AudioTetris = () => {
  const [mute, setMute] = useState(false);
  const myRef = useRef();

  useEffect(() => {
    playTetrisAudio();
  }, []);

  const playTetrisAudio = () => {
    setMute(true);
  };

  const pauseTetrisAudio = () => {
    myRef.current.pause();
    setMute(false);
  };

  return (
    <div className="stats-audio">
      {/* autoplay change to true */}
      <audio ref={myRef} src={tetrisgame} autoPlay={true} />
      {!mute ? (
        <IconButton
          className={"stats-audio__wrapper"}
          onClick={() => playTetrisAudio()}
          disableRipple
        >
          <VolumeOff
            className={"stats-audio__wrapper icon"}
            style={{ backgroundColor: "transparent" }}
            color="secondary"
          />
        </IconButton>
      ) : (
        <IconButton
          className={"stats-audio__wrapper"}
          onClick={() => pauseTetrisAudio()}
          disableRipple
        >
          <VolumeUp
            className={"stats-audio__wrapper icon"}
            style={{ backgroundColor: "transparent" }}
            color="secondary"
          />
        </IconButton>
      )}
    </div>
  );
};

export default AudioTetris;
