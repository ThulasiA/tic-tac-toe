import React from "react";

function Square(props) {
  return (
    <button
      className={"square " + (props.isWinning ? "square--won" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
