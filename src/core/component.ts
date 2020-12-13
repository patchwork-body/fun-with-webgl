import { initBuffer } from '../utils/buffer';
import { ComponentTypeError } from '../utils/errors';
import {
  createFragmentShader,
  createVertextShader,
  createWebGLProgram,
} from '../utils/shader';
import { Vector4 } from '../utils/vector';
import {
  IBaseComponent,
  IBaseComponentParams,
  IComponentParams,
  IContainerComponentParams,
} from './@types/component';

class BaseComponent<
  TParentComponent extends IBaseComponent,
  TChildComponent extends IBaseComponent
> implements IBaseComponent<TParentComponent, TChildComponent> {
  constructor({ name, group = '' }: IBaseComponentParams) {
    this.name = name;
    this.group = group;
  }

  name: string;
  group = '';
  hasParent = false;
  initialized = false;

  _parent: TParentComponent | null = null;
  _children: Record<string, TChildComponent> = {};

  set parent(parent: TParentComponent) {
    this._parent = parent;
    this.hasParent = true;
  }

  componentWillBeRenderedFirstTime(gl: WebGL2RenderingContext): void {
    this.initialized = true;
    Object.keys(this._children).forEach(key =>
      this._children[key].componentWillBeRenderedFirstTime(gl),
    );
  }

  onEachRenderFrame(gl: WebGL2RenderingContext): void {
    Object.keys(this._children).forEach(key =>
      this._children[key].onEachRenderFrame(gl),
    );
  }

  attachChildComponent(component: TChildComponent): void {
    if (component instanceof BaseComponent) {
      component.parent = this;
      this._children[component.name] = component;
    } else {
      throw new ComponentTypeError();
    }
  }

  detachChildComponent(name: string): void {
    delete this._children[name];
  }
}

class Component extends BaseComponent<IBaseComponent, IBaseComponent> {
  vertexShaderSource = '';
  fragmentShaderSource = '';
  requireAttribs: string[] = [];
  requireUniforms: string[] = [];

  elementIndex = 0;
  attribs: Record<string, number> = {};
  uniforms: Record<string, WebGLUniformLocation> = {};

  constructor({ name, vertices }: IComponentParams) {
    super({ name, group: 'render' });

    this.addVertices(vertices);
  }

  addVertices(vertices: Vector4[]): void {
    const prevVertices =
      this.constructor.prototype.vertices || new Float32Array([]);
    const arraySize = prevVertices.length + vertices.length * 4;

    const nextVertices = new Float32Array(arraySize);

    nextVertices.set(prevVertices, 0);

    nextVertices.set(
      vertices.reduce<number[]>((arr, vec) => arr.concat(vec.asArray()), []),
      prevVertices.length,
    );

    this.constructor.prototype.vertices = nextVertices;
    this.elementIndex =
      (nextVertices.length - vertices.length * 4) / (vertices.length * 4);
  }

  componentWillBeRenderedFirstTime(gl: WebGL2RenderingContext): void {
    this.preRender(gl);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      this.constructor.prototype.vertices,
      gl.DYNAMIC_DRAW,
    );

    super.componentWillBeRenderedFirstTime(gl);
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
}

export { BaseComponent, Component };
