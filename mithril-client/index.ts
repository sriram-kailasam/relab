import m from "mithril";
import CodeScreen from "./src/code/code-screen/code-screen";

function App() {
  return {
    view() {
      return m("div", [m(CodeScreen)]);
    },
  };
}

m.mount(document.getElementById("root"), App);
