import { util } from './utils.js';
/**
 * 游戏控制器类
 */
class GameController {
  constructor(canvas, ctx, option) {
    this.canvas = canvas;
    this.ctx = ctx;
    this._fps = 60;
    this._rafId = null;
    this._lastFrameTime = 0;
    this.option = option;
  }
  start() {
    this.__draw();
  }
  pause() {
    cancelAnimationFrame(this._rafId);
    this._rafId = null;
  }
  _isPaused() {
    return this._rafId === null;
  }
  // 控制器装载,在document加载完毕后调用init方法
  setup() {
    if (document.readyState === 'complete') {
      this._init();
    } else {
      window.addEventListener('load', this._init(), false);
    }
  }
  // 初始化画布
  _init() {
    // 生成一个屏幕宽高的的画布
    util.initCanvas(this.canvas, window.innerWidth, window.innerHeight);
    // 事件订阅
    Object.keys(this.option.events).forEach(key => {
      this._bind(key, this.option.events[key]);
    });
    // 开始绘图
    this._draw();
  }
  // 事件订阅
  _bind(key, func) {
    switch (key) {
      case 'keyPressed':
        document.onkeydown = function (e) {
          e.preventDefault();
          func(e.key);
        };
        break;
      case 'mousePressed':
        document.onmousedown = function (e) {
          e.preventDefault();
          func(e.clientX, e.clientY);
        };
        break;
      default:
        break;
    }
  }
  // 画布绘图,按60fps绘制
  _draw() {
    const logic = time => {
      this._rafId = requestAnimationFrame(logic);
      if (time - this._lastFrameTime < 1000 / this.fps) {
        return;
      }
      this._lastFrameTime = time;
      this.option.draw();
    };
    this._rafId = requestAnimationFrame(logic);
  }
}
export { GameController };
