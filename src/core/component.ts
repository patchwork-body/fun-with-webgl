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

export { Component, IComponentConfig };
