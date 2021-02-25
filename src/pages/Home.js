/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import arrowRight from "../img/arrow_right.png";

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
          <div className="bg-success col-12 col-lg-6">
            <div className="room-container py-4 m-3">
              <div className="px-3">
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
                      <img src={arrowRight} alt="Validation button" />
                    </button>
                  </div>
                </form>
              </div>
              <div className="container-fluid room-container__list mt-4">
                <div className="row text-center room-item">
                  <div className="col-8">
                    <span>Room name</span>
                  </div>
                  <div className="room-join col-2">
                    <span>3 / 4</span>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-img">
                      <img src={arrowRight} alt="Validation button" />
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
                      <img src={arrowRight} alt="Validation button" />
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
                      <img src={arrowRight} alt="Validation button" />
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
                      <img src={arrowRight} alt="Validation button" />
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
          <div className="bg-warning col-12 col-lg-6">
            <div class="container row mx-auto d-flex justify-content-center my-4">
              <div class="col-12 col-md-11 col-lg-9 border-dark rounded bg-dark">
                <div class="row align-items-center msg-head border-bottom">
                  <div class="col-md-3 col-lg-2">
                    <a href="/matchs" class="btn btn-matcha msg-button">
                      &#8678; Matchs
                    </a>
                  </div>
                  <div class="col-md-9 col-lg-10 justify-content-center">
                    <div class="d-flex align-items-center justify-content-center msg-head-username">
                      <h3>Thyrse</h3>
                    </div>
                  </div>
                </div>
                <div class="row msg-body">
                  <div class="col-md-12 pt-2" id="zone_chat">
                    <div class="row msg-right">
                      <div class="col-md-5 offset-md-7 msg-content-right">
                        <p class="speech-bubble speech-bubble-right">
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
                  <div class="row msg-foot border-top">
                    <div class="col-md-9 col-lg-10 msg-new">
                      <input
                        class="msg-new-input"
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
                    <div class="col-md-3 col-lg-2 text-right">
                      <input type="hidden" value="" name="profile_id" />
                      <button
                        class="btn btn-matcha msg-button"
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
