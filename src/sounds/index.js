// todo 我不知道 vue 的脚手架怎么配置来支持静态资源文件，所以暂时用这种方法
const soundsFileURI = 'https://github.com/Zen-Song/Zen-Song.Github.io/blob/master/src/'

export default class Sounds {
  constructor() {
    // initialize and preload sounds
    this.successAudio = new Audio(soundsFileURI + 'sounds/success.mp3?raw=true')
    this.failureAudio = new Audio(soundsFileURI + './sounds/failure.mp3?raw=true')
    this.doneAudio = new Audio(soundsFileURI + './sounds/done.mp3?raw=true')
    this.backgroundAudio = new Audio(soundsFileURI + './sounds/background.mp3?raw=true')
  }

  playSuccess() {
    this.successAudio.play()
  }

  playFailure() {
    this.failureAudio.play()
  }

  playDone() {
    this.doneAudio.play()
  }

  playBackgroundAudio() {
    this.backgroundAudio.play()
  }
}

export { Sounds }
