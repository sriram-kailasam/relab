import React from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = props => {
  return (
    <MonacoEditor
      height="100%"
      language="javascript"
      theme="dark"
    ></MonacoEditor>
  );
};

export default CodeEditor;
