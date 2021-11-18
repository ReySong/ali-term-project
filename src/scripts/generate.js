import { KeyCode } from "./keycode";

function GenerateRamdonLocElems() {
    /**
     * 用来生成随机坐标的虚拟按键
     */
    return {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
        width: 120,
        height: 80,
        color: "orange",
        textColor: "white",
        keycode: KeyCode[Math.floor(Math.random() * KeyCode.length)]
    }
}

export default GenerateRamdonLocElems;