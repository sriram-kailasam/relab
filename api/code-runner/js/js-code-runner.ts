import { CodeRunner, CodeOutput } from "..";
import { exec } from "child_process";
import fs from "fs-extra";
import { v4 as uuid } from "uuid";
import path from "path";

export class JsCodeRunner implements CodeRunner {
  async run(code: string, stdin: string): Promise<CodeOutput> {
    const random = uuid();
    const filename = path.join(__dirname, `${random}.js`);

    await fs.writeFile(filename, code);
    console.log(filename);
    return new Promise((resolve, reject) => {
      const proc = exec("node " + filename, (err, stdout, stderr) => {
        if (!err) {
          fs.remove(filename).catch(() => {
            console.error("file remove failed:", filename);
          });

          resolve({ exitCode: 0, stdout, stderr });
        } else reject(err);
      });

      proc.stdin.end(stdin);
    });
  }
}
