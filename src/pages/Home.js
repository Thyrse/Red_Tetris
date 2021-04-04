/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import arrowRight from "../img/arrow_right.png";
import arrowRightWhite from "../img/arrow_right_white.png";
import Chat from "../components/Chat";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Home = ({ socket }) => {
  // const socket = socketIOClient.connect("http://localhost:4000");
  const history = useHistory();
  const [room, setRoom] = useState();
  const roomsList = useSelector((state) => state.roomsList.roomsList);
  const currentUser = useSelector((state) => state.userData.userDatas);

  console.log("Socket on Home ==>", socket);
  console.log("ROOM VALUE ==>", room);
  console.log("ROOMS LIST ==>", roomsList);
  useEffect(() => {
    console.log("Passing here ==>", socket);
    socket.emit("home", "Salut les michtos");
  });

  const handleChange = (e) => {
    setRoom(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("CREATE_ROOM", { name: room, owner: currentUser.socketID });
    setRoom("");
  };

  const handleJoin = (datas) => {
    socket.emit("JOIN_ROOM", { datas: datas, currentUser: currentUser });
    history.push(`/game#${datas.name}[${currentUser.username}]`);
  };
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
                <form action="" onSubmit={handleSubmit}>
                  <div className="room-container__create">
                    <input
                      type="text"
                      name="roomName"
                      id="roomName"
                      className="form-control"
                      placeholder="Enter room name..."
                      onChange={(e) => handleChange(e)}
                      value={room || ""}
                    />
                    <button className="btn btn-img btn-outline-arrow">
                      <img src={arrowRightWhite} alt="Validation button" />
                    </button>
                  </div>
                </form>
              </div>
              <div className="container-fluid room-container__list">
                {roomsList &&
                  roomsList.length > 0 &&
                  roomsList.map((room) => (
                    <div className="row text-center room-item">
                      <div className="col-8">
                        <span>{room.name}</span>
                      </div>
                      <div className="room-join col-2">
                        <span>
                          {room.members.length}/{room.size}
                        </span>
                      </div>
                      <div className="room-button col-2">
                        {room.members.length >= room.size ? (
                          <span>UNAVAILABLE</span>
                        ) : (
                          <button
                            onClick={() => handleJoin(room)}
                            className="btn btn-img"
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
