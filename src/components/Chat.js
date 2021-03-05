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
const Chat = () => {
  return (
    <>
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
    </>
  );
};

export default Chat;
