import { Request, Response, Router } from "express";
import { CodeRunner } from ".";
import { JsCodeRunner } from "./js/js-code-runner";

export class ExecutionController {
  router = Router();
  handleExecute = async (req: Request, res: Response) => {
    const body = req.body;

    let codeRunner: CodeRunner;
    switch (body.language) {
      case "javascript":
        codeRunner = new JsCodeRunner();
    }

    try {
      const { output } = await codeRunner.run(body.code, body.stdin);
      res.json({
        success: true,
        output,
      });
    } catch (err) {
      console.error(err);
      res.json({ success: false, error: err });
    }
  };

  register() {
    this.router.post("/", this.handleExecute);

    return this.router;
  }
}
