import React, { HTMLAttributes } from "react";
import classNames from "classnames";
import "./Button.scss";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonStyle: "success" | "normal";
}

export const Button: React.FC<ButtonProps> = props => {
  return (
    <button
      className={classNames({
        "rl-button": true,
        "rl-button-success": props.buttonStyle === "success",
        "rl-button-normal": props.buttonStyle === "normal"
      })}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
