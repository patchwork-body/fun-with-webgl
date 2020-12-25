attribute vec4 a_Position;
uniform mat4 u_translateMatrix;

void main(void) {
  gl_Position = a_Position * u_translateMatrix;
}
