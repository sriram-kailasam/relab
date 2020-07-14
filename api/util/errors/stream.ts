import { Readable } from "stream";

export async function streamToString(
  stream: Readable | NodeJS.ReadWriteStream
): Promise<string> {
  const chunks: Buffer[] = [];

  return new Promise(resolve => {
    stream.on("data", chunk => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString()));
  });
}
