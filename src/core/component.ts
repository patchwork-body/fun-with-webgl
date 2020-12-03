interface IComponentConfig {
  name: string;
}

class Component {
  private components: Record<string, Component> = {};

  public name: string;

  constructor({ name }: IComponentConfig) {
    this.name = name;
  }

  addComponent(component: Component): void {
    this.components[component.name] = component;
  }

  render(gl: WebGL2RenderingContext): void {
    Object.keys(this.components).forEach(key =>
      this.components[key].render(gl),
    );
  }
}

export { Component, IComponentConfig };
