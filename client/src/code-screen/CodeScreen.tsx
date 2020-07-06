import React, { useEffect, useState, useRef } from "react";
import { Card } from "../components/card";
import "./CodeScreen.scss";
import { Button } from "../components/button";
import { TabLayout } from "../components/tab-layout";
import { ExecutorService } from "./ExecutorService";
import MonacoEditor from "@monaco-editor/react";
import ResizeDetector from "react-resize-detector";

export const CodeScreen = () => {
  const [outputVisible, setOutputVisible] = useState(false);
  const [stdin, setStdin] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);

  const editorRef = useRef<any>(null);

  const Stdin = () => {
    return (
      <div className="rl-stdin">
        <textarea
          cols={100}
          rows={10}
          onChange={e => setStdin(e.target.value)}
        ></textarea>
      </div>
    );
  };

  const handleEditorMount = (_, editor) => {
    setIsEditorReady(true);
    editorRef.current = editor;
  };

  useEffect(() => {
    setTimeout(() => {
      setOutputVisible(true);
    }, 0);
  }, []);

  return (
    <div className="rl-code-screen">
      <Card className="rl-question-card">
        <h2>Heading 1</h2>
        <p>
          Lorem eiusmod adipisicing commodo excepteur irure culpa. Amet esse est
          quis dolore laborum do. Officia tempor ad qui sit ut cupidatat sit.
          Sunt pariatur ullamco esse laboris exercitation labore pariatur enim
          occaecat. Duis id eiusmod Lorem duis.
        </p>
      </Card>
      <div className="rl-code-section">
        <Card className="rl-code-card">
          <MonacoEditor
            height="100%"
            language="javascript"
            theme="dark"
            editorDidMount={handleEditorMount}
          />
        </Card>
        <ResizeDetector
          handleHeight
          onResize={() => {
            console.log("Handle resize");
            if (isEditorReady) {
              if (editorRef != null && editorRef.current != null) {
                editorRef.current.layout();
              }
            }
          }}
        >
          <Card className="rl-execute-card">
            {outputVisible && (
              <div className="rl-output-section">
                <TabLayout
                  titles={["stdin", "stdout", "stderr"]}
                  components={[<Stdin />]}
                ></TabLayout>
              </div>
            )}{" "}
            <div className="rl-execute-buttons">
              <Button onClick={() => {}} buttonStyle="normal">
                Execute
              </Button>
              <Button
                onClick={async () => {
                  const executor = new ExecutorService();
                  const output = await executor.getOutput(
                    editorRef.current.getValue(),
                    stdin,
                    "javascript"
                  );

                  console.log("output:", output);
                }}
                buttonStyle="success"
              >
                Submit
              </Button>
            </div>
          </Card>
        </ResizeDetector>
      </div>
    </div>
  );
};
