export type CodeOutput = {
  exitCode: number;
  stdout: string;
  stderr: string;
};

export interface CodeRunner {
  run(code: string, stdin: string): Promise<CodeOutput>;
}
