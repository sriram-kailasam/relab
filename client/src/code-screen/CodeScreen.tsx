import React, { useEffect, useState } from "react";
import { Card } from "../components/card";
import CodeEditor from "../components/CodeEditor";
import "./CodeScreen.scss";
import { Button } from "../components/button";
import { TabLayout } from "../components/tab-layout";

const Stdin = () => {
  return (
    <div className="rl-stdin">
      <textarea cols={100} rows={10}></textarea>
    </div>
  );
};
export const CodeScreen = () => {
  const [outputVisible, setOutputVisible] = useState(false);
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
          <CodeEditor></CodeEditor>
        </Card>
        <Card className="rl-execute-card">
          {outputVisible && (
            <div className="rl-output-section">
              <TabLayout
                titles={["STDIN", "STDOUT"]}
                components={[<Stdin />]}
              ></TabLayout>
            </div>
          )}{" "}
          <div className="rl-execute-buttons">
            <Button onClick={() => {}} buttonStyle="normal">
              Execute
            </Button>
            <Button onClick={() => {}} buttonStyle="success">
              Submit
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
