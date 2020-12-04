import { NullBufferError } from './errors';

const initBuffer = (gl: WebGL2RenderingContext): WebGLBuffer => {
  const buffer = gl.createBuffer();

  if (buffer === null) {
    throw new NullBufferError();
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  return buffer;
};

export { initBuffer };
