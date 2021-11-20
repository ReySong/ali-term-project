<template>
      <div class="container">
      <span>Play Game</span><br/>
      <button class="btn btn-parabola " @click="toParabolicBall">抛物游戏</button>
      <button class="btn" >淡出坠落</button>
      </div>
  
</template>

<script>
// import { FadeIn, FadeOut } from './scripts/fade';
// import  GenerateRamdonLocElems from './scripts/generate';
// import ParabolicBall from './components/ParabolicBall'
// import EndPage from './components/EndPage'
// import { setup, Game } from './scripts/game';
export default {
  name: 'PlayGame',
  methods:{
   
    toParabolicBall(){
      this.$router.push('/parbolicBall')
      // this.isShow = true
    },
    
    
  },
  // components: {ParabolicBall},
} 
</script>

<style>

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
    box-shadow:
    2.9px 5.4px 5.2px -34px rgba(0, 0, 0, 0.07),
    7.9px 14.9px 14.3px -34px rgba(0, 0, 0, 0.1),
    19px 35.9px 34.4px -34px rgba(0, 0, 0, 0.13),
    63px 119px 114px -34px rgba(0, 0, 0, 0.2);

    border:solid 5px #593207;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    padding:10px
}

.btn {
  width:180px; 
  height:80px;
  position: absolute;
  top: 70%;
  left:50%;
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
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1.5rem;
  line-height: 23px;
  outline: none;
  padding: .75rem;
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
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.btn:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}


.btn-start {
  position: fixed;
  left: 45%;
  bottom: 10%;
  /* transform: translate(-50%); */
}

.btn-drop {
  position: fixed;
  left: 20%;
  bottom: 30%;
}

.btn-parabola {
  position: fixed;
  top: 40% !important;
}

.btn-fade {
  position: fixed;
  right: 20%;
  bottom: 30%;
}

</style>

