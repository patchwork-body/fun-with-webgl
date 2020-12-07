attribute vec4 a_PointPosition;
attribute float a_PointSize;

void main(void) {
  gl_Position = a_PointPosition;
  gl_PointSize = a_PointSize;
}
