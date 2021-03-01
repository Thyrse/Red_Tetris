/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import arrowRight from "../img/arrow_right.png";
import arrowRightWhite from "../img/arrow_right_white.png";

/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Home = () => {
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
          <div className="col-12 col-lg-6 chat-container">
            <div className="container-fluid row mx-auto d-flex justify-content-center m-3">
              <div className="col-12 border-dark rounded chat-container__box shadow">
                <div className="bg-head chat-container__box-title row align-items-center justify-content-center border-bottom p-3">
                  <h3>Messagerie</h3>
                </div>
                <div className="row">
                  <div className="col-12 pt-2 chat-messages" id="zone_chat">
                    <div className="row">
                      <div className="col-12 text-right my-1 chat-messages__message">
                        <span>Thyrse</span>
                        <p className="secondary-font">
                          Lorem ipsum dolor sit amet consectetur.
                        </p>
                      </div>
                      <div className="col-12 text-left my-1 chat-messages__message">
                        <span>Ziphlot</span>
                        <p className="secondary-font">
                          Lorem ipsum dolor sit amet consectetur.
                        </p>
                      </div>
                      <div className="col-12 text-left my-1 chat-messages__message">
                        <span>Scao</span>
                        <p className="secondary-font">
                          Lorem ipsum dolor sit amet consectetur.
                        </p>
                      </div>
                      <div className="col-12 text-right my-1 chat-messages__message">
                        <span>Thyrse</span>
                        <p className="secondary-font">
                          Lorem ipsum dolor sit amet consectetur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  action=""
                  method="post"
                  id="formulaire_chat"
                  onsubmit="return false;"
                >
                  <div className="row msg-foot border-top">
                    <div className="col-md-9 col-lg-10 msg-new secondary-font">
                      <input
                        className="msg-new-input"
                        type="text"
                        name="message"
                        id="message"
                        placeholder="Message..."
                        size="50"
                        spellcheck="false"
                        autofocus
                      />
                      <input type="hidden" name="roomie" />
                    </div>
                    <div className="col-md-3 col-lg-2 text-right">
                      <input type="hidden" value="" name="profile_id" />
                      <button
                        className="btn btn-white msg-button"
                        type="submit"
                        id="envoi_message"
                        onclick="add_message(this)"
                      >
                        Send &#8679;
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
