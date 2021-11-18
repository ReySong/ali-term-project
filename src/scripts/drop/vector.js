/**
 * 简单的位移工具类
 */
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(x, y) {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      return this;
    } else {
      this.x += x || 0;
      this.y += y || 0;
    }
    return this;
  }
  mult(num) {
    this.x = num;
    this.y = num;
    return this;
  }
}
export { Vector };
