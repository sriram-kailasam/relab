import React, { HTMLAttributes } from "react";
import "./Card.scss";

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <div
      className={["rl-card", props.className].join(" ")}
      {...props}
      style={props.style}
    >
      {props.children}
    </div>
  );
};
