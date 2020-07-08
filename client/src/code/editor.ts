import m from "mithril";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export default function CodeEditor(): m.Component {
  let monacoEditor: monaco.editor.IStandaloneCodeEditor;
  const model = monaco.editor.createModel("");

  return {
    oncreate() {
      const container = document.getElementById("rl-code-editor");
      if (container) {
        monacoEditor = monaco.editor.create(container, { theme: "vs-dark" });
        monacoEditor.setModel(model);
      }
    },
    view() {
      return m("#rl-code-editor", { style: { height: "100%" } });
    },
  };
}
