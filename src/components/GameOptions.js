import React from "react";
import "../styles/grid.scss";

const GameOptions = ({ className, title, state }) => {
  // console.log(className)
  return (
    <div className={className}>
      <span>{title}</span>
      <span>{state}</span>
    </div>
  );
};

export default GameOptions;
