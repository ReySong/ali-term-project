import { Vector } from './Vector.js';
/**
 * 对外提供服务的工具类
 */
class Util {
  constructor() {}
  initCanvas(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
  }
  // 创建一个矢量
  createVector(x, y) {
    return new Vector(x, y);
  }
  // 填充canvas背景
  background(canvas, ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  // 根据num返回随机值
  random(num1, num2 = 0) {
    debugger;
    if (num1 > num2) this.random(num2, num1);
    return Math.round(Math.random() * (num2 - num1 + 1) + num1);
  }
  // 返回颜色值
  color(r, g, b) {
    return {
      colors: [r, g, b],
      str: `rgb(${r},${g},${b})`,
    };
  }
}
const util = new Util();
export { util };
