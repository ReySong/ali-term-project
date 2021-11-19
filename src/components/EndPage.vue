<template>
  <div class="background">
    <div class="container">
      <span>Game Over</span><br />
      <span>Your Score</span><br />
      <span ref="countup" class="text"></span>
      <button class="btn" @click="jumpToHome()">返回首页</button>
    </div>
  </div>
</template>

<script>
import { CountUp } from 'countup.js'
export default {
  name: 'EndPage',
  data() {
    return {
      options: {
        startVal: 0,
      },
      endCount: 2021,
    }
  },
  mounted() {
    this.initCountUp()
  },
  methods: {
    initCountUp() {
      let demo = new CountUp(this.$refs.countup, this.endCount, this.options)
      if (!demo.error) {
        demo.start()
      } else {
        console.error(demo.error)
      }
    },
    jumpToHome() {
      this.$router.push({
        path: 'game',
      })
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200&display=swap');

.background {
  background: url('../../public/background.jpg');
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.text {
  color: #4d63bc;
  font-size: 80px;
}
.container {
  width: 300px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -300px;
  /* background-color: #D7D7D7; */
  text-align: center;
  font-size: 50px;
  /* -webkit-text-stroke: 1px #373750;
    -webkit-text-fill-color: transparent; */
  box-shadow: 2.9px 5.4px 5.2px -34px rgba(0, 0, 0, 0.07), 7.9px 14.9px 14.3px -34px rgba(0, 0, 0, 0.1),
    19px 35.9px 34.4px -34px rgba(0, 0, 0, 0.13), 63px 119px 114px -34px rgba(0, 0, 0, 0.2);

  border: solid 5px #593207;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 10px;
}

.btn {
  width: 180px;
  height: 80px;
  position: absolute;
  top: 70%;
  left: 50%;
  margin-left: -90px;
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1.5rem;
  line-height: 23px;
  outline: none;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.btn:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.btn:focus {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
}
</style>
