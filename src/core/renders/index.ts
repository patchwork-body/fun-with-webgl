import { Component } from '../component';
import { initBuffer } from '../utils/buffer';
import {
  createFragmentShader,
  createVertextShader,
  createWebGLProgram,
} from '../utils/shader';

interface IRenderComponent {
  name: string;
  vertices: Float32Array;
}

abstract class RenderComponent extends Component {
  abstract vertexShaderSource: string;
  abstract fragmentShaderSource: string;
  abstract requireAttribs: string[];
  abstract requireUniforms: string[];

  static vertices: Float32Array;
  static program: WebGLProgram;
  static buffer: WebGLBuffer;

  public elementIndex = 0;
  public attribs: Record<string, number> = {};
  public uniforms: Record<string, WebGLUniformLocation> = {};

  constructor({ name, vertices }: IRenderComponent) {
    super({ name, group: 'render' });

    this.addVertices(vertices);
  }

  addVertices(vertices: Float32Array): void {
    const prevVertices =
      this.constructor.prototype.vertices || new Float32Array([]);
    const arraySize = prevVertices.length + vertices.length;
    const nextVertices = new Float32Array(arraySize);

    nextVertices.set(prevVertices, 0);
    nextVertices.set(vertices, prevVertices.length);

    this.constructor.prototype.vertices = nextVertices;
    this.elementIndex =
      (nextVertices.length - vertices.length) / vertices.length;
  }

  initComponent(gl: WebGL2RenderingContext): void {
    if (!this.initialized) {
      gl.bufferData(
        gl.ARRAY_BUFFER,
        this.constructor.prototype.vertices,
        gl.DYNAMIC_DRAW,
      );
    }
  }

  preRender(gl: WebGL2RenderingContext): void {
    let program = this.constructor.prototype.program;

    if (!program) {
      const vShader = createVertextShader(gl, this.vertexShaderSource);
      const fShader = createFragmentShader(gl, this.fragmentShaderSource);
      program = createWebGLProgram(gl, vShader, fShader, true);
      gl.useProgram(program);

      const buffer = initBuffer(gl);

      this.constructor.prototype.program = program;
      this.constructor.prototype.buffer = buffer;
    }

    this.requireAttribs.forEach(attrib => {
      this.attribs[attrib] = gl.getAttribLocation(program, attrib);
    });

    this.requireUniforms.forEach(uniform => {
      this.uniforms[uniform] = gl.getUniformLocation(
        program,
        uniform,
      ) as WebGLUniformLocation;
    });
  }

  render(gl: WebGL2RenderingContext): void {
    this.preRender(gl);
    this.initComponent(gl);
    super.render(gl);
  }
}

export { RenderComponent, IRenderComponent };
