import Docker from "dockerode";

const DEFAULT_IMAGE_NAME = "relab-executor";

export async function buildImage(imageName: string = DEFAULT_IMAGE_NAME) {
  const docker = new Docker();

  return docker.buildImage(
    { context: __dirname, src: ["Dockerfile"] },
    { t: imageName }
  );
}

export async function executeInContainer(
  cmd: string[],
  stdinString: string = "",
  imageName: string = DEFAULT_IMAGE_NAME
) {
  const docker = new Docker();

  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmd,
    AttachStderr: true,
    AttachStdin: true,
    AttachStdout: true,
    OpenStdin: true,
    StdinOnce: true,
    NetworkDisabled: true,
  });

  const stream = await container.attach({
    hijack: true,
    sterr: true,
    stdout: true,
    stdin: true,
    stream: true,
  });

  stream.write(stdinString);

  await container.start();
  await container.wait();

  stream.end();
  container.remove();

  return stream;
}
