const createVertextShader = (
  gl: WebGL2RenderingContext,
  source: string,
): WebGLShader | null => {
  const shader = gl.createShader(gl.VERTEX_SHADER);
  if (shader) createShader(gl, shader, source);
  return shader;
};

const createFragmentShader = (
  gl: WebGL2RenderingContext,
  source: string,
): WebGLShader | null => {
  const shader = gl.createShader(gl.FRAGMENT_SHADER);
  if (shader) createShader(gl, shader, source);
  return shader;
};

const createShader = (
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
): WebGLProgram | null => {
  const program = gl.createProgram();

  if (!program) {
    console.error('Cannot create programm');
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      `Error while linking program ${gl.getProgramInfoLog(program)}`,
    );
    gl.deleteProgram(program);
    return null;
  }

  if (debug) {
    gl.validateProgram(program);

    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      console.error(
        `Error while validating program ${gl.getProgramInfoLog(program)}`,
      );
      gl.deleteProgram(program);
      return null;
    }
  }

  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
};

export {
  createShader,
  createVertextShader,
  createFragmentShader,
  createWebGLProgram,
};
