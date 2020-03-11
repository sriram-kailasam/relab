import React from "react";
import "./Card.scss";

export const Card = props => {
  return (
    <div className={["rl-card", props.className].join(" ")} style={props.style}>
      {props.children}
    </div>
  );
};
