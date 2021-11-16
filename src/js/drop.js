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
  background(51);
  buttons.forEach(button => {
    // 绘制虚拟按键并初始化动画
    button.drop();
    button.update();
  });
}
// 键盘按下事件
function keyPressed() {
  //按键按下时触发一次
  for (let i = 0; i < buttons.length; i++) {
    const element = buttons[i];
    element.target(key);
  }
}
// 用点击注册事件模拟按键产生过程
function mousePressed() {
  const position = createVector(mouseX, mouseY);
  if (position.y > 0.8 * window.visualViewport.height) return;
  const button = new Button('q', 0.8 * window.visualViewport.height, position);
  buttons.push(button);
}
// 模拟的按键类，设置了下落动画所需的树形
class Button {
  constructor(key, bottomBound, position, dir, size, color = 'red') {
    // 按键是啥
    this.key = key;
    // 下线
    this.bottomBound = bottomBound;
    // 中心位置向量——createVector返回坐标向量
    this.position = position ? createVector(position.x, position.y) : createVector(random(width), random(height));
    // 掉落方位向量
    this.dir = dir ? createVector(dir.x, dir.y) : createVector(0, 0);
    // 尺寸
    this.size = size || 30;
    // 颜色
    this.color = color;
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
    noStroke();
    fill(this.color);
    rect(this.position.x, this.position.y, this.size * 2);
    textSize(48);
    fill('white');
    text(this.key, this.position.x + this.size / 2, this.position.y + this.size * 1.2);
  }
  // 触边消失
  edge() {
    if (this.position.y + this.size > this.bottomBound) {
      buttons = buttons.filter(p => p !== this);
    }
  }
  // 按键命中消失
  target(key) {
    console.log(key);
    if (this.key == key) {
      // 应确保一次只消失一个
      this.bingo();
    }
  }
  // 退场动画
  bingo() {
    buttons = buttons.filter(p => p !== this);
  }
}
