import { Vector4 } from '../../utils/vector';

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
}

interface IBaseComponentParams {
  name: string;
  group?: string;
}

interface IComponentParams extends IBaseComponentParams {
  vertices: Vector4[];
}

interface IComponent extends IBaseComponent {
  coords: Vector4;
}

interface IContainerComponentParams extends IBaseComponentParams {
  position: Vector4;
}
