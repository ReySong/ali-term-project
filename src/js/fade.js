import { KeyCodeMapTable } from "./keycodeTable";

function FadeIn(ctx, elem, op) {
    op += 0.1;
    let keyValue = KeyCodeMapTable[elem.keycode];
    ctx.globalAlpha = op;
    ctx.fillStyle = elem.color;
    ctx.fillRect(elem.x, elem.y, elem.width, elem.height);
    ctx.fillStyle = elem.textColor;
    ctx.strokeText(keyValue, elem.x + elem.width / 2, elem.y + elem.height / 1.8);

    let r = requestAnimationFrame(() => {
        FadeIn(ctx, elem, op);
    })

    return r;
}

function FadeOut(ctx, elem, op) {
    op -= 0.1;
    let keyValue = KeyCodeMapTable[elem.keycode];
    ctx.clearRect(elem.x, elem.y, elem.width, elem.height);
    ctx.globalAlpha = op;
    ctx.fillStyle = elem.color;
    ctx.fillRect(elem.x, elem.y, elem.width, elem.height);
    ctx.fillStyle = elem.textColor;
    ctx.strokeText(keyValue, elem.x + elem.width / 2, elem.y + elem.height / 1.8);

    requestAnimationFrame(() => {
        FadeOut(ctx, elem, op);
    })


}

export { FadeIn, FadeOut };