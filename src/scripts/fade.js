import { KeyCodeMapTable } from "./keycode";

function FadeIn(root, elem, idCount) {
    const speed = 20; 
    const keyValue = KeyCodeMapTable.get(elem.keycode);
    let div = document.createElement("div");
    div.id = `${idCount + 1}`;
    div.style.position= "fixed";
    div.style.top = elem.y + "px";
    div.style.left = elem.x + "px";
    div.style.height = "40px";
    div.style.width = "80px";
    div.style.color = elem.textColor;
    div.style.backgroundColor = elem.color; 
    div.style.textAlign = "center";
    div.innerText = keyValue;
    root.appendChild(div);
    let op = 0;
    let st = setInterval(() => {
        op += 0.05;
        div.style.opacity = op;
        if (op >= 1) {
            clearInterval(st);  
        }
    }, speed);

    return div.id;
}

function FadeOut(id) {
    const speed = 20;
    // let root = document.getElementById("root");
    let div = document.getElementById(id);
    let op = 1;
    let st = setInterval(() => {
        op -= 0.05;
        div.style.opacity = op;
        if (op <= 0) {
            clearInterval(st);
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