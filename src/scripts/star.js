/* eslint-disable no-undef */
var stage = new Konva.Stage({
  container: 'star',
  width: window.innerWidth,
  height: window.innerHeight
});

var layer = new Konva.Layer();

var positionX=stage.width()/2;
var positionY=stage.height()/2;
var text=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
var scale = 0.5 + Math.random();

var star = new Konva.Star({
  x: positionX,
  y: positionY,
  numPoints: 5,
  innerRadius: 30,
  outerRadius: 50,
  fill: '#89b717',
  opacity: 0.8,
  rotation: Math.random() * 180,
  scale: {
    x: scale,
    y: scale
  },
  stroke: '#005500',
  strokeWidth: 4,
  shadowColor: 'black',
  shadowBlur: 10,
  shadowOffset: {
    x: 5,
    y: 5
  },
  shadowOpacity: 0.6
});

var simpleText = new Konva.Text({
  x: positionX,
  y: positionY,
  text: text[Math.round((text.length-1)*Math.random())] ,
  offsetX:scale*10,
  offsetY:scale*10,
  fontSize: scale*28,
  fontFamily: 'Times New Roman',
  fill: 'green'
});


layer.add(star);
layer.add(simpleText)

stage.add(layer);
