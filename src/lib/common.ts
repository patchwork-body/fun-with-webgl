type GLclampf4 = [GLclampf, GLclampf, GLclampf, GLclampf];

const getWebGLContext = (
  canvasID: string,
): [HTMLCanvasElement, WebGL2RenderingContext] | null => {
  const canvasElement = document.getElementById(canvasID) as HTMLCanvasElement;

  if (!canvasElement) {
    console.error(`Cannot find canvas element by id ${canvasID}`);
    return null;
  }

  const glContext = canvasElement.getContext('webgl2');

  if (!glContext) {
    console.error('WebGL context is not available');
    return null;
  }

  return [canvasElement, glContext];
};

const setWebGLViewportClearColor = (
  gl: WebGL2RenderingContext,
  color: GLclampf4,
): void => {
  gl.clearColor(...color);
};

const clearWebGLViewport = (gl: WebGL2RenderingContext): void => {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

const resizeWebGLViewport = (
  canvasElement: HTMLCanvasElement,
  gl: WebGL2RenderingContext,
  size: [number, number],
): void => {
  const [width, height] = size;

  canvasElement.style.setProperty('width', width.toString());
  canvasElement.style.setProperty('height', height.toString());
  canvasElement.width = width;
  canvasElement.height = height;

  gl.viewport(0, 0, width, height);
};

const drawPoint = (gl: WebGL2RenderingContext, program: WebGLProgram): void => {
  gl.useProgram(program);
  gl.drawArrays(gl.POINTS, 0, 1);
};

export {
  GLclampf4,
  getWebGLContext,
  setWebGLViewportClearColor,
  clearWebGLViewport,
  resizeWebGLViewport,
  drawPoint,
};
