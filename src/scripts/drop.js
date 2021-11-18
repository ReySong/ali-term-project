// 虚拟按键
let buttons = [];
// setup函数，每次程序开始运行时执行一次，用于初始化
function setup() {
  // 生成一个屏幕宽高的的画布
  createCanvas(window.visualViewport.width, window.visualViewport.height);
}
// draw函数，每秒运行60次，不断地在画布上绘制图形
function draw() {
  //绘制画布背景
  // background(51);
  buttons.forEach(button => {
    // 绘制虚拟按键并初始化动画
    button.drop();
    button.update();
  });
}
// 键盘按下事件
function keyPressed() {
  //按键按下时触发一次，命中距离底部最近的按键
  let targets = buttons.filter(button => button.key === key);
  if (targets.length != 0) {
    targets.sort((a, b) => b.position.y - a.position.y);
    targets[0].target();
  }
}
// 用点击注册事件模拟按键产生过程
function mousePressed() {
  const position = createVector(mouseX, mouseY);
  if (position.y > 0.8 * window.visualViewport.height) return;
  const button = new Button('q', position);
  buttons.push(button);
}
// 模拟的按键类，设置了下落动画所需的树形
class Button {
  constructor(
    key,
    position,
    dir,
    size,
    color = 'red',
    opcity = 1,
    topBound = 0,
    rightBound = window.visualViewport.width,
    bottomBound = window.visualViewport.height,
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
    this.position = position ? createVector(position.x, position.y) : createVector(random(width), random(height));
    // 掉落方位向量
    this.dir = dir ? createVector(dir.x, dir.y) : createVector(0, 0);
    // 尺寸
    this.size = size || 30;
    // 颜色
    this.color = color;
    // 透明度
    this.opcity = opcity;
    // 加速度向量
    this.acc = createVector(0, 0);
  }
  // 下落更新
  update() {
    // 加速度向下增量
    this.acc.add(createVector(0, 0.3));
    // 更新dir
    this.dir.add(this.acc);
    // 然后更新position
    this.position.add(this.dir);
    // 加速度归零
    this.acc.mult(0);
    // 判断是否触底
    this.edge();
  }
  // 绘制按键
  drop() {
    if (this.opcity < 1) {
      if (this.opcity <= 0.1) {
        buttons = buttons.filter(button => button !== this);
      } else {
        noStroke();
        fill(`rgba(${this.color.levels[0]},${this.color.levels[1]},${this.color.levels[2]},${(this.opcity -= 0.05)})`);
        rect(this.position.x - this.size, this.position.y - this.size, this.size * 2);
      }
    } else if (this.opcity == 1) {
      noStroke();
      fill(this.color);
      rect(this.position.x - this.size, this.position.y - this.size, this.size * 2);
      textSize(48);
      fill('white');
      text(this.key, this.position.x - this.size / 2, this.position.y + this.size * 0.2);
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
    for (let i = 0; i < 15; i++) {
      const button = new Button(
        '',
        position,
        dir,
        size / 2,
        color(random(255), random(255), random(255)),
        0.8,
        position.y - size * 5,
        position.x + size * 5,
        position.y + size * 5,
        position.x - size * 5
      );
      button.acc.add(createVector(random(-20, 20), random(-20, 20)));
      buttons.push(button);
    }
  }
}
