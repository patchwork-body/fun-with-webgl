interface IGlInstance {
  setClearColor: (
    red: GLclampf,
    green: GLclampf,
    blue: GLclampf,
    alpha: GLclampf,
  ) => IGlInstance;
  clear: () => IGlInstance;
  resize: (width: number, height: number) => IGlInstance;
}

type GLclampf4 = [GLclampf, GLclampf, GLclampf, GLclampf];

const initGlInstance = (canvasId: string): IGlInstance | null => {
  let _clearColor: GLclampf4;

  const canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
  const webGlContext = canvasElement.getContext('webgl2');

  if (!webGlContext) {
    console.error('WebGL context is not available');
    return null;
  }

  const setClearColor: IGlInstance['setClearColor'] = (
    red,
    green,
    blue,
    alpha,
  ) => {
    _clearColor = [red, green, blue, alpha];
    webGlContext.clearColor(..._clearColor);
    return methods;
  };

  const clear: IGlInstance['clear'] = () => {
    webGlContext.clear(
      webGlContext.COLOR_BUFFER_BIT | webGlContext.DEPTH_BUFFER_BIT,
    );
    return methods;
  };

  const resize: IGlInstance['resize'] = (width, height) => {
    canvasElement.style.setProperty('width', width.toString());
    canvasElement.style.setProperty('height', height.toString());
    canvasElement.width = width;
    canvasElement.height = height;

    webGlContext.viewport(0, 0, width, height);

    return methods;
  };

  const methods = { setClearColor, clear, resize };

  return methods;
};

export { initGlInstance };
