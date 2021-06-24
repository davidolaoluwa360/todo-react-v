import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <React.Fragment>
      <button
        type={props.type}
        className="btn"
        id={props.color}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </React.Fragment>
  );
};

export default Button;
