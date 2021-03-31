/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import arrowRight from "../img/arrow_right.png";
import arrowRightWhite from "../img/arrow_right_white.png";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Chat = ({ socket }) => {
  const [message, setMessage] = useState();
  const [chatContent, setChatContent] = useState([]);
  // const socket = socketIOClient.connect("http://localhost:4000");
  const usersList = useSelector((state) => state.listUsers.usersList);
  const currentUser = useSelector((state) => state.userData.userDatas);

  console.log("Socket on Chat ==>", socket);
  console.log("VALUE OF currentUser ==>", currentUser);

  const outputMessage = (pseudo, message) => {
    const yolo = chatContent;
    yolo.push({ username: pseudo, msg: message });
    setChatContent(yolo);
    console.log("Pseudo ==>", pseudo);
    console.log("Message ==>", message);
    setMessage("");
  };

  console.log("Chat content ==>", chatContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("NEW_MESSAGE", {
      message: message,
      username: currentUser.username,
    });
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  console.log("Message state ==>", message);
  useEffect(() => {
    console.log("Passing here ==>", socket);
    // socket.emit("home", "Salut les michtos");
    socket.on("NEW_MESSAGE", function (data) {
      outputMessage(data.username, data.message);
    });
  }, []);

  return (
    <>
      <div className="col-12 col-lg-6 chat-container">
        <div className="container-fluid row mx-auto d-flex justify-content-center m-3">
          <div className="col-12 border-dark rounded chat-container__box shadow">
            <div className="bg-head chat-container__box-title row align-items-center justify-content-center border-bottom p-3">
              <h3>Messagerie</h3>
            </div>
            <div className="row">
              <div className="col-9 pt-2 chat-messages" id="zone_chat">
                <div className="row">
                  {chatContent &&
                    chatContent.length > 0 &&
                    chatContent.map((content, index) => (
                      <div
                        key={index}
                        className="col-12 text-right my-1 chat-messages__message"
                      >
                        <span>{content.username}</span>
                        <p className="secondary-font">{content.msg}</p>
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-3 chat-users shadow__light">
                <ul>
                  {usersList &&
                    usersList.length > 0 &&
                    usersList.map((user) => <li>{user}</li>)}
                </ul>
              </div>
            </div>
            <form action="" id="formulaire_chat" onSubmit={handleSubmit}>
              <div className="row msg-foot border-top">
                <div className="col-md-9 col-lg-10 msg-new secondary-font">
                  <input
                    className="msg-new-input"
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Message..."
                    size="50"
                    spellCheck="false"
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    value={message || ""}
                  />
                  <input type="hidden" name="roomie" />
                </div>
                <div className="col-md-3 col-lg-2 text-right">
                  <input type="hidden" value="" name="profile_id" />
                  <button
                    className="btn btn-white msg-button"
                    type="submit"
                    id="envoi_message"
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
