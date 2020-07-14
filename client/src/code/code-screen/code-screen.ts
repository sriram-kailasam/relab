import m from "mithril";
import Card from "../../components/card/card";
import * as monaco from "monaco-editor";
import "./code-screen.scss";
import TabLayout from "../../components/tab-layout/tab-layout";
import Button from "../../components/button/button";
import { getOutput } from "../executor";

function Stdin(): m.Component<m.Attributes> {
  return {
    view({ attrs }) {
      return m(
        ".rl-stdin",
        m("textarea", {
          cols: 100,
          rows: 10,
          oninput: attrs.oninput,
        })
      );
    },
  };
}

const lipsum = ` Lorem eiusmod adipisicing commodo excepteur irure culpa. Amet esse est
quis dolore laborum do. Officia tempor ad qui sit ut cupidatat sit.
Sunt pariatur ullamco esse laboris exercitation labore pariatur enim
occaecat. Duis id eiusmod Lorem duis.`;

export default function CodeScreen(): m.Component {
  let stdin = "";
  let language = "javascript";
  let output;

  let editor: monaco.editor.IStandaloneCodeEditor;
  const editorModel = monaco.editor.createModel("");

  function handleStdinInput(e) {
    stdin = e.target.value;
  }

  async function handleExecute() {
    const code = editorModel.getValue();
    output = await getOutput(code, stdin, language);
    console.log("output", output);
  }

  function handleSubmit() {}

  return {
    oncreate() {
      const container = document.getElementById("rl-code-editor");
      if (container) {
        editor = monaco.editor.create(container, {
          value: "",
          theme: "vs-dark",
          automaticLayout: true,
          language: "javascript",
        });
        editor.setModel(editorModel);
      }
    },
    view() {
      return m(".rl-code-screen", [
        m(Card, { class: "rl-question-card" }, [
          m("h2", "Question Heading"),
          m("p", lipsum),
        ]),
        m(
          ".rl-code-section",
          m(
            Card,
            { class: "rl-code-card" },
            m("#rl-code-editor", { style: { height: "100%" } })
          ),
          m(Card, { class: "rl-execute-card" }, [
            m(
              ".rl-output-section",
              m(TabLayout, {
                titles: ["stdin", "stdout", "stderr"],
                components: [
                  m(Stdin, { oninput: handleStdinInput }),
                  m("div", output ? output.output : ""),
                ],
                initialIndex: 0,
              })
            ),
            m(Card, { class: "rl-execute-buttons" }, [
              m(
                Button,
                { buttonStyle: "normal", onclick: handleExecute },
                "Execute"
              ),
              m(
                Button,
                { buttonStyle: "success", onclick: handleSubmit },
                "Submit"
              ),
            ]),
          ])
        ),
      ]);
    },
  };
}
