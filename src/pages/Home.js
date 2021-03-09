/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import arrowRight from "../img/arrow_right.png";
import arrowRightWhite from "../img/arrow_right_white.png";
import Chat from "../components/Chat";
import socketIOClient from "socket.io-client";
// import { yoloEmit } from "../../public/yolo";

/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Home = () => {
  const socket = socketIOClient.connect("http://localhost:4000");
  useEffect(() => {
    console.log("Passing here ==>", socket);
    socket.emit("yolo", "Salut les michtos");
  });
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
                <form action="">
                  <div className="room-container__create">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      placeholder="Enter room name..."
                    />
                    <button className="btn btn-img btn-outline-arrow">
                      <img src={arrowRightWhite} alt="Validation button" />
                    </button>
                  </div>
                </form>
              </div>
              <div className="container-fluid room-container__list">
                <div className="row text-center room-item">
                  <div className="col-8">
                    <span>Room name</span>
                  </div>
                  <div className="room-join col-2">
                    <span>3 / 4</span>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-img">
                      <img src={arrowRightWhite} alt="Validation button" />
                    </button>
                  </div>
                </div>
                <div className="row text-center room-item">
                  <div className="col-8">
                    <span>Room name</span>
                  </div>
                  <div className="room-join col-2">
                    <span>3 / 4</span>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-img">
                      <img src={arrowRightWhite} alt="Validation button" />
                    </button>
                  </div>
                </div>
                <div className="row text-center room-item">
                  <div className="col-8">
                    <span>Room name</span>
                  </div>
                  <div className="room-join col-2">
                    <span>3 / 4</span>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-img">
                      <img src={arrowRightWhite} alt="Validation button" />
                    </button>
                  </div>
                </div>
                <div className="row text-center room-item">
                  <div className="col-8">
                    <span>Room name</span>
                  </div>
                  <div className="room-join col-2">
                    <span>3 / 4</span>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-img">
                      <img src={arrowRightWhite} alt="Validation button" />
                    </button>
                  </div>
                </div>
                {/* <div className="room-item">
                  <div>
                    <span>Room name</span>
                  </div>
                  <div className="room-join">
                    <span>3 / 4</span>
                  </div>
                  <div>
                    <button className="btn btn-img btn-outline-arrow">
                      <img src={arrowRight} alt="Validation button" />
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Home;
