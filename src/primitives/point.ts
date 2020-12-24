// import vertexShaderSource from './shaders/point.vs';
// import fragmentShaderSource from './shaders/point.fs';
// import { RenderComponent } from '../core';
// import { Vector4 } from '../utils/vector';

// interface IPointConfig extends IBaseComponentParams {
//   position: Vector4;
//   size: number;
//   color: [number, number, number];
// }

// class Point extends RenderComponent {
//   public position: Vector4;
//   public size = 1.0;
//   public color: [number, number, number] = [0.0, 0.0, 0.0];

//   public vertexShaderSource = vertexShaderSource;
//   public fragmentShaderSource = fragmentShaderSource;
//   public requireAttribs = ['a_PointPosition', 'a_PointSize'];
//   public requireUniforms = ['u_PointColor'];

//   constructor({ name, position, size, color }: IPointConfig) {
//     super({
//       name,
//       vertices: [position],
//     });

//     this.position = position;
//     this.size = size;
//     this.color = color;
//   }

//   onEachRenderFrame(gl: WebGL2RenderingContext): void {
//     gl.vertexAttribPointer(
//       this.attribs.a_PointPosition,
//       4,
//       gl.FLOAT,
//       false,
//       0,
//       0,
//     );
//     gl.enableVertexAttribArray(this.attribs.a_PointPosition);

//     gl.vertexAttrib1f(this.attribs.a_PointSize, this.size);
//     gl.uniform4f(this.uniforms.u_PointColor, ...this.color, 1.0);

//     gl.drawArrays(gl.POINTS, this.elementIndex, 1);

//     super.onEachRenderFrame(gl);
//   }
// }

// export { Point };
