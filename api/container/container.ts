import Docker from "dockerode";
import { ExecutionOutput } from "../code-runner";

const DEFAULT_IMAGE_NAME = "relab-executor";
const DEFAULT_TIMEOUT = 10000;

export async function buildImage(imageName: string = DEFAULT_IMAGE_NAME) {
  const docker = new Docker();

  return docker.buildImage(
    { context: __dirname, src: ["Dockerfile"] },
    { t: imageName }
  );
}

export async function executeInContainer(
  cmd: string[],
  binds: string[],
  stdinString: string = "",
  timeout: number = DEFAULT_TIMEOUT,
  imageName: string = DEFAULT_IMAGE_NAME
): Promise<ExecutionOutput> {
  const docker = new Docker();

  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmd,
    HostConfig: {
      Binds: binds,
    },
    AttachStderr: true,
    AttachStdin: true,
    AttachStdout: true,
    OpenStdin: true,
    StdinOnce: true,
    NetworkDisabled: true,
  });

  console.log("container id", container.id);

  const stream = await container.attach({
    hijack: true,
    sterr: true,
    stdout: true,
    stdin: true,
    stream: true,
  });

  const chunks: Buffer[] = [];
  let output = "";
  let containerExists = true;

  stream.on("data", data => {
    chunks.push(data);
    console.log("data", data);
  });

  stream.on("end", () => {
    let buf = Buffer.concat(chunks);

    output = buf.slice(8).toString();
    console.log("stream ended");
  });

  stream.write(stdinString);
  stream.emit("finish");

  await container.start();

  const _timeout = setTimeout(async () => {
    const { State } = await container.inspect();
    if (State.Running && containerExists) {
      try {
        container.stop();
        containerExists = false;
      } catch (err) {
        console.error(err);
      }
    }
    console.log("state", State);
  }, timeout);

  const { StatusCode } = await container.wait();
  console.log("StatusCode", StatusCode);
  console.log("chunks", chunks);
  stream.end();
  console.log("output", output);

  if (containerExists) {
    try {
      container.remove();
      containerExists = false;
    } catch (err) {
      console.error(err);
    }
  }

  clearTimeout(_timeout);

  return {
    exitCode: StatusCode,
    output,
  };
}
