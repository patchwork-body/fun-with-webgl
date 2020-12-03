import {
  clearWebGLViewport,
  getWebGLContext,
  GLclampf4,
  resizeWebGLViewport,
  setWebGLViewportClearColor,
  drawPoint,
} from './common';
import {
  createFragmentShader,
  createVertextShader,
  createWebGLProgram,
} from './shader';

interface IGlInstance {
  createShader: (type: ShaderType, source: string) => IGlInstance;
  createProgram: (debug?: boolean) => IGlInstance;
  setClearColor: (color: GLclampf4) => IGlInstance;
  clear: () => IGlInstance;
  resize: (width: number, height: number) => IGlInstance;
  draw: () => IGlInstance;
}

enum ShaderType {
  Vertex,
  Fragment,
}

const glLib = (canvasID: string): IGlInstance | null => {
  let vertexShader: WebGLShader | null = null;
  let fragmentShader: WebGLShader | null = null;
  let program: WebGLProgram | null = null;

  const result = getWebGLContext(canvasID);

  if (!result) {
    return result;
  }

  const [canvasElement, glContext] = result;

  const setClearColor = (color: GLclampf4) => {
    setWebGLViewportClearColor(glContext, color);
    return methods;
  };

  const clear = () => {
    clearWebGLViewport(glContext);
    return methods;
  };

  const resize = (width: number, height: number) => {
    resizeWebGLViewport(canvasElement, glContext, [width, height]);
    return methods;
  };

  const createShader = (type: ShaderType, source: string) => {
    switch (type) {
      case ShaderType.Vertex:
        vertexShader = createVertextShader(glContext, source);
        break;
      case ShaderType.Fragment:
        fragmentShader = createFragmentShader(glContext, source);
        break;
    }

    return methods;
  };

  const createProgram = (debug = true) => {
    if (!(vertexShader && fragmentShader)) {
      console.error('Shaders was not created');
      return methods;
    }

    program = createWebGLProgram(
      glContext,
      vertexShader,
      fragmentShader,
      debug,
    );
    return methods;
  };

  const draw = () => {
    if (!program) {
      console.error('Program was not created');
      return methods;
    }

    drawPoint(glContext, program);
    return methods;
  };

  const methods = {
    setClearColor,
    clear,
    resize,
    createShader,
    createProgram,
    draw,
  };
  return methods;
};

export { glLib, ShaderType };
