import { CodeRunner, ExecutionOutput } from "..";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { executeInContainer } from "../../container/container";

export class JsCodeRunner implements CodeRunner {
  async run(code: string, stdin: string): Promise<ExecutionOutput> {
    let tempDir = __dirname.replace(":", "").replace(/\\/g, "/");
    // const tempDir = __dirname;
    console.log(tempDir);
    // const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "relab-"));
    const sourceFilename = path.join(__dirname, `code.js`);

    const bind = `/${tempDir}:/usr/src/project/`;
    console.log("bind", bind);
    await fs.writeFile(sourceFilename, code);
    console.log("tempDir", tempDir);
    console.log(sourceFilename);
    return executeInContainer(
      ["node", "/usr/src/project/code.js"],
      [bind],
      stdin
    );
  }
}
