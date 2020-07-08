import m from "mithril";
import classNames from "classnames";
import "./tab-layout.scss";

interface Attrs {
  titles: string[];
  initialIndex?: number;
  components: m.Vnode[];
}

export default function TabLayout(): m.Component<Attrs> {
  let selectedIndex;

  return {
    oninit({ attrs }) {
      selectedIndex = attrs.initialIndex;
    },
    view({ attrs }) {
      return m(".rl-tab-layout", [
        m(
          ".rl-titles",
          attrs.titles.map((title, index) =>
            m(
              "h3.rl-title",
              {
                class: classNames({
                  "rl-selected": index === selectedIndex,
                }),
                onclick: function () {
                  selectedIndex = index;
                },
              },
              title
            )
          )
        ),
        m(
          ".rl-components",
          selectedIndex < attrs.components.length
            ? attrs.components[selectedIndex]
            : undefined
        ),
      ]);
    },
  };
}
