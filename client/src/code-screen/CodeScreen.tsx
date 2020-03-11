import React from "react";
import { Card } from "../components/card";
import CodeEditor from "../components/CodeEditor";
import "./CodeScreen.scss";
import { Button } from "../components/button";

export const CodeScreen = () => {
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
          <Button value="Submit" onClick={() => {}} />
          <Button value="Submit" onClick={() => {}} />
        </Card>
      </div>
    </div>
  );
};
