// todo 我不知道 vue 的脚手架怎么配置来支持静态资源文件，所以暂时用这种方法
// const soundsFileURI = 'https://github.com/Zen-Song/Zen-Song.Github.io/blob/master/src/';
const successAudio = require('./success.mp3');
const failureAudio = require('./failure.mp3');
const doneAudio = require('./done.mp3');
const backgroundAudio = require('./background.mp3');

export default class Sounds {
  constructor() {
    // initialize and preload sounds
    this.successAudio = new Audio(successAudio);
    this.failureAudio = new Audio(failureAudio);
    this.doneAudio = new Audio(doneAudio);
    this.backgroundAudio = new Audio(backgroundAudio);
  }

  playSuccess() {
    this.successAudio.play();
  }

  playFailure() {
    this.failureAudio.play();
  }

  playDone() {
    this.doneAudio.play();
  }

  playBackgroundAudio() {
    this.backgroundAudio.play();
  }
  pauseBackgroundAudio() {
    this.backgroundAudio.pause();
  }
}

export { Sounds };