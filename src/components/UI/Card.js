import React from "react";

const Card = (props) => {
  return <div className={props.class}>{props.children}</div>;
};

export default Card;
