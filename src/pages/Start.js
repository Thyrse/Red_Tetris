import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setGameInit } from "../redux/game/action";

const Start = (props) => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const handleChange = () => {
    setChecked((prev) => !prev);
    if (checked) {
      dispatch(setGameInit({ startGame: false }));
    } else {
      dispatch(setGameInit({ startGame: true }));
    }
  };

  return (
    <div>
      <div className="col-12 col-lg-6 chat-container">
        <div className="container-fluid row mx-auto d-flex justify-content-center m-3">
          <div className="col-12 border-dark rounded chat-container__box shadow">
            <div className="bg-head chat-container__box-title row align-items-center justify-content-center p-3">
              <button
                onClick={(e) => handleChange()}
                style={{ backgroundColor: checked ? "green" : "red" }}
              >
                <h3>READY</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
