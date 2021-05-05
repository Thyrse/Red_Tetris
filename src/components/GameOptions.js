import React from "react";

const GameOptions = ({ className, title, state }) => {
  return (
    <div className={className}>
      <span>{title}</span>
      <span>{state}</span>
    </div>
  );
};

export default GameOptions;
