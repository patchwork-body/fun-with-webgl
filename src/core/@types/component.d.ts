interface IBaseComponent<
  TParentComponent = IBaseComponent,
  TChildComponent = IBaseComponent
> {
  name: string;
  group: string;

  _parent: TParentComponent | null;
  _children: Record<string, TChildComponent>;

  hasParent: boolean;
  initialized: boolean;

  componentWillBeRenderedFirstTime(gl: WebGL2RenderingContext): void;
  onEachRenderFrame(gl: WebGL2RenderingContext): void;

  attachChildComponent(component: TChildComponent): void;
  detachChildComponent(name: string): void;

  getRootComponent(): IBaseComponent<unknown, unknown>;
}

interface IBaseComponentParams {
  name: string;
  group?: string;
}

type IComponentParams = IBaseComponentParams;
