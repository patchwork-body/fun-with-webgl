interface IComponentConfig {
  name: string;
}

class Component {
  public name: string;
  public parent: Component | null = null;
  public components: Record<string, Component> = {};
  public initialized = false;

  constructor({ name }: IComponentConfig) {
    this.name = name;
  }

  addComponent(component: Component): void {
    component.parent = this;
    this.components[component.name] = component;
  }

  render(gl: WebGL2RenderingContext): void {
    this.initialized = true;
    Object.keys(this.components).forEach(key =>
      this.components[key].render(gl),
    );
  }
}

interface IRenderComponent extends IComponentConfig {
  vertices: Float32Array;
}

class RenderComponent extends Component {
  static vertices: Float32Array;

  public elementIndex = 0;

  constructor({ name, vertices }: IRenderComponent) {
    super({ name });
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
}

export { Component, RenderComponent, IComponentConfig, IRenderComponent };
