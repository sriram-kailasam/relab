import React, { ButtonHTMLAttributes } from "react";
import "./Button.scss";

export const Button: React.FC<React.ComponentProps<"button">> = props => {
  return (
    <button className="rl-button" onClick={props.onClick}>
      {props.value}
    </button>
  );
};
