/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect } from "react";
// REACT ROUTER
import { useHistory } from "react-router-dom";
import arrowRightWhite from "../img/arrow_right_white.png";
import Chat from "../components/Chat";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/auth/actions";

import {
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import { useSnackbar } from "../contexts/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  select: {
    color: "#e0e0e0 !important",
    "&:before": {
      borderColor: "#e0e0e0 !important",
    },
    "&:after": {
      borderColor: "#e0e0e0 !important",
    },
  },
  option: {
    backgroundColor: "#414852 !important",
  },
  icon: {
    fill: "#e0e0e0 !important",
  },
  label: {
    color: "#e0e0e0 !important",
    "&:focus": {
      color: "#e0e0e0 !important",
    },
  },
}));

const Home = ({ socket }) => {
  const classes = styles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [room, setRoom] = useState("");
  const [roomType, setRoomType] = useState(null);
  const roomsList = useSelector((state) => state.roomsList.roomsList);
  const currentUser = useSelector((state) => state.userData.userDatas);
  const snackbar = useSnackbar();

  useEffect(() => {
    socket.emit("JOIN_LOBBY", currentUser);
    const updateRoom = { ...currentUser };
    updateRoom.room = "Lobby";
    dispatch(setUserData(updateRoom));
  }, []);

  const handleChange = (e) => {
    setRoom(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (room !== "" && (roomType === "1" || roomType === "2")) {
      socket.emit("CREATE_ROOM", {
        name: room,
        owner: currentUser.socketID,
        type: roomType,
      });
      setRoom("");
    } else {
      snackbar.set({
        open: true,
        text: "You must provide a valid room name and type of room.",
        severity: "snackbar-danger",
      });
    }
  };

  const handleJoin = (datas) => {
    const updateRoom = { ...currentUser };
    updateRoom.room = datas.id;
    dispatch(setUserData(updateRoom));
    socket.emit("JOIN_ROOM", { datas: datas, currentUser: currentUser });
    history.push(`/game#${datas.name}[${currentUser.username}]`);
  };

  const validRoomName = room.match(/^[a-zA-Z]{1,10}$/);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="room-container pb-4 m-3 shadow">
              <div className="bg-head chat-container__box-title row align-items-center justify-content-center border-bottom p-3">
                <h3>Rooms</h3>
              </div>
              <div className="p-3">
                <form className="form-room" onSubmit={handleSubmit}>
                  <div className="room-container__create">
                    <input
                      type="text"
                      name="roomName"
                      id="roomName"
                      className="form-control control-room"
                      placeholder="Enter room name..."
                      onChange={(e) => handleChange(e)}
                      value={room || ""}
                    />
                    <FormControl className="mx-3 pb-3">
                      <InputLabel className={classes.label}>Type</InputLabel>
                      <Select
                        native
                        value={roomType || ""}
                        onChange={(e) => setRoomType(e.target.value)}
                        label="Type"
                        className={classes.select}
                        inputProps={{
                          classes: {
                            icon: classes.icon,
                          },
                        }}
                      >
                        <option
                          className={classes.option}
                          aria-label="None"
                          value={null}
                        />
                        <option className={classes.option} value={1}>
                          Solo
                        </option>
                        <option className={classes.option} value={2}>
                          Multiplayer
                        </option>
                      </Select>
                    </FormControl>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Room must contain between 1 and 10 alphanumeric characters."
                    >
                      <span className="p-1">
                        <button
                          className="btn btn-img btn-outline-arrow"
                          // disabled={!validRoomName}
                          disabled={
                            roomType === null ||
                            roomType === "" ||
                            !validRoomName
                          }
                        >
                          <img src={arrowRightWhite} alt="Validation button" />
                        </button>
                      </span>
                    </Tooltip>
                  </div>
                </form>
              </div>
              <div className="container-fluid room-container__list">
                {roomsList &&
                  roomsList.length > 0 &&
                  roomsList.map((room, index) => (
                    <div key={index} className="row text-center room-item">
                      <div className="col-6">
                        <span>{room.name}</span>
                      </div>
                      <div className="room-mode col-2">
                        <span>
                          {room.type === "1" ? "Solo" : "Multijoueur"}
                        </span>
                      </div>
                      {room.type === "2" && (
                        <div className="room-join col-2">
                          <span>
                            {room?.members?.length}/{room?.size}
                          </span>
                        </div>
                      )}
                      {room.type === "2" ? (
                        <div className="room-button col-2">
                          {room.type === "2" && room?.hasStarted === true ? (
                            <span>UNAVAILABLE</span>
                          ) : room?.members?.length >= room?.size ? (
                            <span>UNAVAILABLE</span>
                          ) : (
                            <button
                              onClick={() => handleJoin(room)}
                              className="btn btn-img btn-join-room"
                            >
                              <img
                                src={arrowRightWhite}
                                alt="Validation button"
                              />
                            </button>
                          )}
                        </div>
                      ) : room.type === "1" ? (
                        <div className="room-button col-4">
                          {room.type === "1" &&
                          room?.owner !== currentUser.socketID ? (
                            <span>UNAVAILABLE</span>
                          ) : (
                            <button
                              onClick={() => handleJoin(room)}
                              className="btn btn-img btn-join-room"
                            >
                              <img
                                src={arrowRightWhite}
                                alt="Validation button"
                              />
                            </button>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Chat socket={socket} />
        </div>
      </div>
    </>
  );
};

export default Home;
