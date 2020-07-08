import m from "mithril";
import "./card.scss";

interface Attrs {
  class: string;
}

export default function Card(): m.Component<Attrs> {
  return {
    view({ attrs, children }) {
      return m(".rl-card", { class: attrs.class }, children);
    },
  };
}
