import { initBuffer } from '../utils/buffer';
import { RenderComponentTypeError } from '../utils/errors';
import {
  createFragmentShader,
  createVertextShader,
  createWebGLProgram,
} from '../utils/shader';
import { Vector4 } from '../utils/vector';

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
      throw new RenderComponentTypeError();
    }
  }

  detachChildComponent(name: string): void {
    delete this._children[name];
  }

  getRootComponent(): IBaseComponent {
    let root = this as IBaseComponent;

    while (root?.hasParent) {
      root = root._parent as IBaseComponent;
    }

    return root;
  }
}

class RenderComponent extends BaseComponent<IBaseComponent, IBaseComponent> {
  vertexShaderSource = '';
  fragmentShaderSource = '';
  requireAttribs: string[] = [];
  requireUniforms: string[] = [];

  vertices = new Float32Array([]);
  elementIndex = 0;
  program!: WebGLProgram;
  buffer!: WebGLBuffer;
  attribs: Record<string, number> = {};
  uniforms: Record<string, WebGLUniformLocation> = {};

  constructor({ name }: IComponentParams) {
    super({ name, group: 'render' });
  }

  addVertices(vertices: Vector4[]): void {
    const prevVertices = this.vertices;
    const arraySize = prevVertices.length + vertices.length * 4;

    const nextVertices = new Float32Array(arraySize);

    nextVertices.set(prevVertices, 0);

    nextVertices.set(
      vertices.reduce<number[]>((arr, vec) => arr.concat(vec.asArray()), []),
      prevVertices.length,
    );

    this.vertices = nextVertices;
    this.elementIndex =
      (nextVertices.length - vertices.length * 4) / (vertices.length * 4);
  }

  componentWillBeRenderedFirstTime(gl: WebGL2RenderingContext): void {
    const vShader = createVertextShader(gl, this.vertexShaderSource);
    const fShader = createFragmentShader(gl, this.fragmentShaderSource);
    const program = createWebGLProgram(gl, vShader, fShader, true);
    gl.useProgram(program);

    const buffer = initBuffer(gl);

    this.program = program;
    this.buffer = buffer;

    this.requireAttribs.forEach(attrib => {
      this.attribs[attrib] = gl.getAttribLocation(this.program, attrib);
    });

    this.requireUniforms.forEach(uniform => {
      this.uniforms[uniform] = gl.getUniformLocation(
        this.program,
        uniform,
      ) as WebGLUniformLocation;
    });

    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

    super.componentWillBeRenderedFirstTime(gl);
  }
}

export { BaseComponent, RenderComponent };
