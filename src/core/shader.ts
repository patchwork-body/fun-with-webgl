const createVertextShader = (
  gl: WebGL2RenderingContext,
  source: string,
): WebGLShader => {
  const shader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
  compileShader(gl, shader, source);
  return shader;
};

const createFragmentShader = (
  gl: WebGL2RenderingContext,
  source: string,
): WebGLShader => {
  const shader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
  compileShader(gl, shader, source);
  return shader;
};

const compileShader = (
  gl: WebGL2RenderingContext,
  shader: WebGLShader,
  source: string,
): void => {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
};

const createWebGLProgram = (
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
  debug = true,
): WebGLProgram => {
  const program = gl.createProgram() as WebGLProgram;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      `Error while linking program ${gl.getProgramInfoLog(program)}`,
    );
    gl.deleteProgram(program);
  }

  if (debug) {
    gl.validateProgram(program);

    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      console.error(
        `Error while validating program ${gl.getProgramInfoLog(program)}`,
      );
      gl.deleteProgram(program);
    }
  }

  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
};

export { createVertextShader, createFragmentShader, createWebGLProgram };
