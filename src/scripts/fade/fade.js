import { KeyCodeMapTable } from "../keycode";

function FadeIn(elem, id) {
    const root = document.getElementById("root");
    const keyValue = KeyCodeMapTable.get(elem.keycode);
    let div = document.createElement("div");
    div.id = `${id}`;
    div.style.position= "fixed";
    div.style.height = elem.height;
    div.style.width = elem.width;
    div.style.color = "black";
    div.style.textAlign = "center";
    div.innerText = keyValue;
    div.style.top = elem.top + "%";
    if (elem.right !== undefined) div.style.right = elem.right + "%";
    if (elem.left !== undefined) div.style.right = elem.left + "%";
    div.style.transform = "translate(50%)";
    div.style.alignSelf = "center";
    div.style.backgroundColor = "#fff";
    div.style.backgroundImage = "none";
    div.style.backgroundPosition = "0 90%";
    div.style.backgroundRepeat = "repeat no-repeat";
    div.style.backgroundSize = "4px 3px";
    div.style.borderRadius = "15px 225px 255px 15px 15px 255px 225px 15px";
    div.style.borderStyle = "solid";
    div.style.borderWidth = "2px";
    div.style.boxSizing = "border-box";
    div.style.display = "inline-block";
    div.style.fontFamily = "Neucha, sans-serif";
    div.style.fontSize = "1rem";
    div.style.lineHeight = "23px";
    div.style.padding = ".75rem";
    div.style.textDecoration = "none";
    div.style.transition = "all 235ms ease-in-out";
    div.style.borderBottomLeftRadius = "15px 255px";
    div.style.borderBottomRightRadius = "225px 15px";
    div.style.borderTopLeftRadius = "255px 15px";
    div.style.borderTopRightRadius = "15px 225px";
    div.style.opacity = 0;
    div.style.visibility = "hidden";
    div.style.transition = "all .2s linear";
    div.style.opacity = 1;
    div.style.visibility = "visible";
    root.appendChild(div);

}

function FadeOut(id) {
    let root = document.getElementById("root");
    let dom = document.getElementById(id);
    dom.style.opacity = 0;
    setTimeout(() => {
        root.removeChild(dom);
    }, 500);
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