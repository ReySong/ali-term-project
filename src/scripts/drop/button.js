import { util } from './utils.js';
// 虚拟按键数组
let buttons = [];
/**
 * 模拟的按键类
 */
class Button {
  constructor(
    key,
    position,
    dir,
    size,
    color = 'lightblue',
    opcity = 1,
    topBound = 0,
    rightBound = window.innerWidth,
    bottomBound = window.innerHeight,
    leftBound = 0
  ) {
    // 按键是啥
    this.key = key;
    // 上边界线
    this.topBound = topBound;
    // 右边界线
    this.rightBound = rightBound;
    // 下边界边线
    this.bottomBound = bottomBound;
    // 左边界边线
    this.leftBound = leftBound;
    // 中心位置向量——createVector返回坐标向量
    this.position = position
      ? util.createVector(position.x, position.y)
      : util.createVector(util.random(window.innerWidth), util.random(window.innerHeight));
    // 掉落方位向量
    this.dir = dir ? util.createVector(dir.x, dir.y) : util.createVector(0, 0);
    // 尺寸
    this.size = size || 30;
    // 颜色
    this.color = color;
    // 透明度
    this.opcity = opcity;
    // 加速度向量
    this.acc = util.createVector(0, 0);
  }
  // 下落更新
  update() {
    // 总位移乘进度的平方
    // 加速度向下增量
    this.acc.add(util.createVector(0, 0.02));
    // 更新dir
    this.dir.add(this.acc);
    // 更新position
    this.position.add(this.dir);
    // 加速度归零
    this.acc.mult(0);
    // 判断是否触底
    this.edge();
  }
  // 绘制按键
  drop(ctx) {
    if (this.opcity < 1) {
      if (this.opcity <= 0.1) {
        buttons = buttons.filter(button => button !== this);
      } else {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color.colors[0]},${this.color.colors[1]},${
          this.color.colors[2]
        },${(this.opcity -= 0.05)})`;
        ctx.fillRect(this.position.x - this.size, this.position.y - this.size, this.size * 2, this.size * 2);
        ctx.closePath();
      }
    } else if (this.opcity == 1) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x - this.size, this.position.y - this.size, this.size * 2, this.size * 2);
      ctx.closePath();
      ctx.beginPath();
      ctx.font = '20px 微软雅黑';
      ctx.fillStyle = 'white';
      ctx.fillText(this.key, this.position.x - this.size / 2, this.position.y + this.size * 0.2);
    } else return;
  }
  // 触边消失
  edge() {
    if (
      this.position.y + this.size > this.bottomBound ||
      this.position.y - this.size < this.topBound ||
      this.position.x + this.size > this.rightBound ||
      this.position.x - this.size < this.leftBound
    ) {
      buttons = buttons.filter(button => button !== this);
    }
  }
  // 按键命中消失
  target() {
    let size = this.size;
    let position = this.position;
    let dir = this.dir;
    buttons = buttons.filter(button => button !== this);
    for (let i = 0; i < 29; i++) {
      const button = new Button(
        '',
        position,
        dir,
        size / 2,
        util.color(util.random(255), util.random(255), util.random(255)),
        0.8,
        position.y - size * 5,
        position.x + size * 5,
        position.y + size * 5,
        position.x - size * 5
      );
      //   i < 10
      button.acc.add(util.createVector(util.random(-20, 10), util.random(-20, 10)));
      buttons.push(button);
    }
  }
}
export { Button, buttons };
