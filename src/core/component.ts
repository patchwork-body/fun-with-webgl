interface IComponentConfig {
  name: string;
  group?: string;
}

class Component {
  public name: string;
  public group: string;
  public parent: Component | null = null;
  public children: Record<string, Component> = {};
  public initialized = false;

  constructor({ name, group }: IComponentConfig) {
    this.name = name;
    this.group = group || '';
  }

  addComponent(component: Component): void {
    component.parent = this;
    this.children[component.name] = component;
  }

  render(gl: WebGL2RenderingContext): void {
    this.initialized = true;
    Object.keys(this.children).forEach(key => this.children[key].render(gl));
  }
}

export { Component, IComponentConfig };
