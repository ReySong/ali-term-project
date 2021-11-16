<template>
    <div id="hahaha" @click="playGame()" >点击一下出现一组抛物线盒子</div>
    <!-- <button @click="removeDiv">点击此处删除存在画面的第一个div</button> -->
</template>

<script>

import {nanoid} from 'nanoid'
export default {
    name: 'ParabolicBall',
    data(){
        return {
            // 抛出的盒子样式
            elementArray:['ghost','square'],
            // 抛出盒子的颜色设置
            colorArray:['#2A7E98','#f5a63','#D91649','#33D1A0','#31027D'],
            // 存放生成的div盒子的id和显示的键值，盒子消失，就把id从idArray里去除
            idArray:[],
            // 记录得分
            yourScore: 0,
        }
    },
    methods:{
        // 生成随机的字符串数组
        makeid(length) {
            let text = [];
            var possible ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            for (let i = 0; i < length; i++)
                text.push( possible.charAt(Math.floor(Math.random() * possible.length)));

            return text;
        },
        // Demo阶段（不完善），点击一下出现一组盒子，按照1.5秒间隔出现，完全版，应该是传入一个字符串数组按照不定的间隔依次出现
        playGame() {
            let lettersArray = this.makeid(20);
            // lettersArray.forEach((letter) => {
            //     this.parabolicRun(letter)
            // })
            for (let i = 0; i < lettersArray.length; i++){
                setTimeout(()=>this.parabolicRun(lettersArray[i]),i*1500)
            }
            
        },

        removeDiv() {
            if(!this.idArray.length) return;
            let elementId = this.idArray.shift().id;
            let element = document.getElementById(elementId);
            element.remove();
            // console.log(this.idArray)
        },

        getRandom (n, m) {
            var num = Math.floor(Math.random() * (m - n + 1) + n)
            return num
        },
        // 生成和盒子和抛物线动画
        parabolicRun(letter) {
            // 无残影
            // console.log(event.clientX,event.clientY)
            // this.addAnimation({x: event.clientX, y:event.clientY},'', '', 500);
            this.addAnimation(letter,{x: this.getRandom(50,500), y: this.getRandom(350,450)},'', '', 500);
            // 有残影
            // this.ghost({x: event.clientX, y:event.clientY}, '', '', 500);
        },
        ghost(startPosition, endPosition, time, num) {
            for (let i = 0; i < num; i++) {
                this.addAnimation(startPosition, endPosition, time, i / (num + 1), true);
            }
        },
        // 生成普通的小球 传入 1.初始坐标 2.结束点坐标 3.动画执行时长
        addAnimation(letter,startPosition = { x: 0, y: 0 }, endPosition, time, num, ghost = false){
        let item = document.createElement('div');
        !ghost ? item.className = this.elementArray[Math.floor(Math.random() * this.elementArray.length)] : item.className = 'ghost';
        item.style.backgroundColor = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
        // if(item.className !== 'five-pointed-star') { 
        //     item.style.backgroundColor = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
        // }
        item.id = nanoid();
        // console.log(item.id);
        item.style.top = startPosition.y + 'px';
        item.style.left = startPosition.x + 'px';
        document.body.appendChild(item);
        item.textContent = letter;
        this.idArray.push({id:item.id,keyValue:letter});
        // console.log(this.idArray);

        // 目的地
        const targetTop = endPosition.y || document.body.offsetHeight ;
        const targetLeft = this.getRandom(800,document.body.offsetWidth) ;
        // console.log(targetTop, targetLeft)

        // 采用固定动画时长方式
        // 前者为动画预计执行时间 (非真正看到的动画时间正相关)
        // 后者为每次动画执行间隔 (以普通60Hz的显示器为示范，每次刷新的间隔为 1/60 s)
        let Time = time /0.02 || (4 / 0.02);

        let Xspeed = (targetLeft - (startPosition.x)) / Time;
        let Yspeed = -10;
        // 控制下坠速度
        // 设置一个加速度A  已知 L = 0.5 * A * T * T + Y * T
        let A = (2 * (targetTop - (startPosition.y) - Yspeed * Time)) / (Time * Time);

        // 时间单位 用以配合加速度计算当前速度 speed = Yspeed + A * T
        let loop = 0;
        let nowX  = startPosition.x;
        let nowY  = startPosition.y;

        // 解决少数浏览器兼容性问题
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = (fn, t = 16.6) => {
                setTimeout(fn, t);
            };
        }
        // 执行动画
        let move = () => {
            // 判断是否要停止
            if (nowY >= targetTop) {
                // 停止 隐藏 销毁 退出
                this.idArray = this.idArray.filter((idArray)=>{
                    return idArray.id !== item.id;
                })
                item.remove();
                // console.log(this.idArray)
                return;
            }
            // 根据当前速度 计算最新位置
            nowX += Xspeed;
            nowY += (A * loop + Yspeed);
            requestAnimationFrame(() => {
                item.style.top = Math.min(nowY, targetTop) + 'px';
                item.style.left = Math.min(nowX, targetLeft) + 'px';
                loop++;
                if (ghost) {
                    item.style.transform = `translate(${-(num * Xspeed)}px ,${-(num * (A * loop + Yspeed))}px)`;
                    item.style.opacity = (1 - num) * 0.5;
                }
                move();
            });
        };
        move();
            
        }
    },
    mounted() {
        // 按下按键消除画面存在的第一个符合条件的div盒子
        document.addEventListener('keyup',(e)=>{
            let pressKey = e.key.toUpperCase();
            console.log(pressKey);
            // 删除第一个符合键值的盒子
            for (let i = 0; i < this.idArray.length; i++) {
                console.log(this.idArray.length)
                if (this.idArray[i].keyValue === pressKey) {
                    if(!this.idArray.length) return;
                    let removeDivId = this.idArray[i].id
                    let removeDiv = document.getElementById(removeDivId);
                    removeDiv.remove();
                    this.idArray.splice(i,1)
                    console.log(this.idArray);
                    break;
                }
            }
        })
    },
}
</script>

<style>
body {
   margin:0;
   /* background-color:black; */
}
#hahaha {
    position: absolute;
    padding: 5px;
    transform: translate(-50%, -50%);
    top: 20%;
    left: 10%;
    font-size: 20px;
    color: #6D6D6D;
    user-select: none;
}
.myAnimation {
    position: fixed;
    width: 60px;
    height: 60px;
    background-color: #0A1821;
    border-radius: 100%;
    z-index: 99;
}
.ghost {
    position: fixed;
    width: 80px;
    height: 80px;
    background-color: #33D1A0;
    border-radius: 100%;
    z-index: 98;
    text-align: center;
    line-height: 80px;
    font-size: 40px;
    -webkit-text-stroke: 1px #EEFFEE;
    -webkit-text-fill-color: transparent;
}



/* .five-pointed-star,
.five-pointed-star::before,
.five-pointed-star::after{
    width: 0;
    height: 0;
    border-left: var(--bw) solid transparent;
    border-right: var(--bw) solid transparent;
    border-top: calc(var(--bw) * 0.726542) solid #D91649; 
}

.five-pointed-star{
    --bw: 60px;
    position: fixed;
}
.five-pointed-star::before{
    content: '';
    position: absolute;
    transform: translate(-50%,-100%) rotate(70deg);
}
.five-pointed-star::after{
    content: '';
    position: absolute;
    transform: translate(-50%,-100%) rotate(-70deg);
} */

/* .diamond{
width: 50px;
height: 0;
border-style: solid;
border-color: transparent transparent red transparent;
border-width: 0 25px 25px 25px;
position: fixed;
margin: 20px 0 50px 0;
}
.diamond:after{
width: 0;
height: 0;
top: 25px;
left: -25px;
border-style: solid;
border-color: red transparent transparent transparent;
border-width: 70px 50px 0 50px;
position: absolute;
content: "";
} */


.square{
    position: fixed;
    width: 80px;
    height: 80px;
    background-color: #f5a631;
    text-align: center;
    line-height: 80px;
    font-size: 40px;
    -webkit-text-stroke: 1px #EEFFEE;
    -webkit-text-fill-color: transparent;
}


</style>