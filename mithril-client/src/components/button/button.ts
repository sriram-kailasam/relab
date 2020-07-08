import m from "mithril";
import classNames from "classnames";
import "./button.scss";

interface Attrs extends m.Attributes {
  buttonStyle: "success" | "normal";
}

export default function Button(): m.Component<Attrs> {
  return {
    view({ attrs, children }) {
      return m(
        "button.rl-button",
        {
          class: classNames({
            "rl-button-success": attrs.buttonStyle === "success",
            "rl-button-normal": attrs.buttonStyle === "normal",
          }),
          onclick: attrs.onclick,
        },
        children
      );
    },
  };
}
