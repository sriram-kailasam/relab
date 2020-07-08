import m from "mithril";

export type CodeOutput = {
  exitCode: number;
  stdout: string;
  stderr: string;
};

export async function getOutput(code: string, stdin: string, language: string) {
  const response = await m.request<CodeOutput>({
    url: "/api/execute",
    method: "post",
    body: {
      language,
      code,
      stdin,
    },
  });

  console.log("response", response);
  return response;
}
