export type ExecutionOutput = {
  exitCode: number;
  output: string;
};

export interface CodeRunner {
  run(code: string, stdin: string): Promise<ExecutionOutput>;
}
