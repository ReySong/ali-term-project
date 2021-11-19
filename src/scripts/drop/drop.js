import { KeyCodeMapTable } from '../keycode';
function DropIn(elem, id, sound, map) {
  const root = document.getElementById('root');
  const keyValue = KeyCodeMapTable.get(elem.keycode);
  let div = document.createElement('div');
  div.keycode = elem.keycode;
  div.id = `${id}`;
  div.value = elem.keycode;
  div.style.position = 'fixed';
  div.style.height = elem.height;
  div.style.width = elem.width;
  div.style.color = 'black';
  div.style.textAlign = 'center';
  div.innerText = keyValue;
  div.style.top = elem.top + '%';
  if (elem.right !== undefined) div.style.right = elem.right + '%';
  if (elem.left !== undefined) div.style.right = elem.left + '%';
  div.style.transform = 'translate(50%)';
  div.style.alignSelf = 'center';
  div.style.backgroundColor = '#fff';
  div.style.backgroundImage = 'none';
  div.style.backgroundPosition = '0 90%';
  div.style.backgroundRepeat = 'repeat no-repeat';
  div.style.backgroundSize = '4px 3px';
  div.style.borderRadius = '15px 225px 255px 15px 15px 255px 225px 15px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '2px';
  div.style.boxSizing = 'border-box';
  div.style.display = 'inline-block';
  div.style.fontFamily = 'Neucha, sans-serif';
  div.style.fontSize = '1rem';
  div.style.lineHeight = '23px';
  div.style.padding = '.75rem';
  div.style.textDecoration = 'none';
  div.style.transition = 'all 235ms ease-in-out';
  div.style.borderBottomLeftRadius = '15px 255px';
  div.style.borderBottomRightRadius = '225px 15px';
  div.style.borderTopLeftRadius = '255px 15px';
  div.style.borderTopRightRadius = '15px 225px';
  div.style.opacity = 0;
  div.style.visibility = 'hidden';
  div.style.transition = 'all .2s linear';
  div.style.opacity = 1;
  div.style.visibility = 'visible';
  root.appendChild(div);
  let isExsit = document.getElementById(id);
  if (isExsit) {
    isExsit.style.animation = '0.5s linear 1s shake-slow';
    dropAnimation(isExsit, sound, map);
  }
}

function DropOut(target) {
  let dom = document.getElementById(target);
  let root = document.getElementById('root');
  if (dom) {
    cancelAnimationFrame(dom.rafId);
    dom.style.opacity = 0;
    root.removeChild(dom);
  }
}
function dropAnimation(target, sound, map) {
  let root = document.getElementById('root');
  let top = target.style.top.match(/(.+)%$/)[1];
  target.addEventListener(
    'animationend',
    function () {
      // 开始下落
      let record = top;
      let acc = 1.5;
      let loop = 1;
      let lastFrameTime = 0;
      let maxTop = Infinity; //max-202.5
      let countFlag = true;
      let drop = time => {
        target.rafId = requestAnimationFrame(drop);
        // 锁60帧
        if (time - lastFrameTime < 1000 / 60) {
          return;
        }
        // 触底
        if (record >= 100 && countFlag) {
          maxTop = record + loop * acc;
          countFlag = false;
          return;
        }
        if (record >= maxTop) {
          cancelAnimationFrame(target.rafId);
          sound.playFailure();
          map.delete(target.keycode);
          // target.removeEventListener('animationend');
          if (target) root.removeChild(target);
          // setTimeout(() => {
          //   sound.playFailure();
          //   root.removeChild(target);
          // }, 0);
          return;
        }
        record = Number(top) + loop * acc;
        target.style.top = `${record}%`;
        loop++;
      };
      target.rafId = requestAnimationFrame(drop);
    },
    false
  );
  // target.addEventListener('transitionend', () => {});
}
export { DropIn, DropOut };
