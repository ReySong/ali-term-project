import { KeyCodeMapTable } from "./keycode";

function FadeIn(root, elem, idCount) {
    const speed = 20; 
    const keyValue = KeyCodeMapTable.get(elem.keycode);
    let div = document.createElement("div");
    div.id = `${idCount}`;
    div.style.position= "fixed";
    div.style.height = "40px";
    div.style.width = "80px";
    div.style.color = "black";
    div.style.textAlign = "center";
    div.innerText = keyValue;
    div.style.top = elem.top + "%";
    if (elem.right !== undefined) div.style.right = elem.right + "%";
    if (elem.left !== undefined) div.style.right = elem.left + "%";
    div.style.alignSelf = "center";
    div.style.backgroundColor = "#fff";
    div.style.backgroundImage = "none";
    div.style.backgroundPosition = "0 90%";
    div.style.backgroundRepeat = "repeat no-repeat";
    div.style.backgroundSize = "4px 3px";
    div.style.borderRadius = "15px 225px 255px 15px 15px 255px 225px 15px";
    div.style.borderStyle = "solid";
    div.style.borderWidth = "2px";
    div.style.boxShadow = "rgba(0, 0, 0, .2) 15px 28px 25px -18px";
    div.style.boxSizing = "border-box";
    div.style.display = "inline-block";
    div.style.fontFamily = "Neucha, sans-serif";
    div.style.fontSize = "1rem";
    div.style.lineHeight = "23px";
    div.style.outline = "none";
    div.style.padding = ".75rem";
    div.style.textDecoration = "none";
    div.style.transition = "all 235ms ease-in-out";
    div.style.borderBottomLeftRadius = "15px 255px";
    div.style.borderBottomRightRadius = "225px 15px";
    div.style.borderTopLeftRadius = "255px 15px";
    div.style.borderTopRightRadius = "15px 225px";
    root.appendChild(div);
    let op = 0;
    let st = setInterval(() => {
        op += 0.01;
        div.style.opacity = op;
        if (op >= 1) {
            clearInterval(st);  
        }
    }, speed);

    return div.id;
}

function FadeOut(dom) {
    
    let root = document.getElementById("root");
    const speed = 20;
    let op = 1;
    let st = setInterval(() => {
        op -= 0.05;
        dom.style.opacity = op;
        if (op <= 0) {
            clearInterval(st);
            root.removeChild(dom);
        }
    }, speed);
}

// function fadeIn(ctx, elem, op) {
//     op += 0.1;
//     let keyValue = KeyCodeMapTable.get(elem.keycode);
//     ctx.globalAlpha = op;
//     ctx.fillStyle = elem.color;
//     ctx.fillRect(elem.x, elem.y, elem.width, elem.height);
//     ctx.fillStyle = elem.textColor;
//     ctx.strokeText(keyValue, elem.x + elem.width / 2, elem.y + elem.height / 1.8);

//     let r = requestAnimationFrame(() => {
//         FadeIn(ctx, elem, op);
//     })

//     return r;
// }

// function FadeOut(ctx, elem, op) {
//     op -= 0.1;
//     let keyValue = KeyCodeMapTable.get(elem.keycode);
//     ctx.clearRect(elem.x, elem.y, elem.width, elem.height);
//     ctx.globalAlpha = op;
//     ctx.fillStyle = elem.color;
//     ctx.fillRect(elem.x, elem.y, elem.width, elem.height);
//     ctx.fillStyle = elem.textColor;
//     ctx.strokeText(keyValue, elem.x + elem.width / 2, elem.y + elem.height / 1.8);

//     requestAnimationFrame(() => {
//         FadeOut(ctx, elem, op);
//     })
// }

export { FadeIn, FadeOut };