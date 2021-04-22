/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import arrowRight from "../img/arrow_right.png";
import arrowRightWhite from "../img/arrow_right_white.png";
import Chat from "../components/Chat";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/auth/actions";
import { Tooltip, Zoom } from "@material-ui/core";
import { useSnackbar } from "../contexts/Snackbar";

const Home = ({ socket }) => {
  // const socket = socketIOClient.connect("http://localhost:4000");
  const dispatch = useDispatch();
  const history = useHistory();
  const [room, setRoom] = useState("");
  const roomsList = useSelector((state) => state.roomsList.roomsList);
  const currentUser = useSelector((state) => state.userData.userDatas);
  const snackbar = useSnackbar();

  // console.log("Socket on Home ==>", socket);
  // console.log("ROOM VALUE ==>", room);
  // console.log("ROOMS LIST ==>", roomsList);
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
    if (room !== "") {
      socket.emit("CREATE_ROOM", { name: room, owner: currentUser.socketID });
      setRoom("");
    } else {
      snackbar.set({
        open: true,
        text: "You must provide a valid username.",
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
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Room must contain between 1 and 10 alphanumeric characters."
                    >
                      <span className="p-1">
                        <button
                          className="btn btn-img btn-outline-arrow"
                          disabled={!validRoomName}
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
                      <div className="col-8">
                        <span>{room.name}</span>
                      </div>
                      <div className="room-join col-2">
                        <span>
                          {room?.members?.length}/{room?.size}
                        </span>
                      </div>
                      <div className="room-button col-2">
                        {room?.members?.length >= room?.size ? (
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
