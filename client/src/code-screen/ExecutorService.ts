import axios from "axios";

export class ExecutorService {
  async getOutput(code: string, stdin: string, language: string): Promise<any> {
    const response = await axios({
      url: "/api/execute",
      method: "post",
      data: {
        language,
        code,
        stdin
      }
    });

    console.log(response.data);
    return response.data;
  }
}
