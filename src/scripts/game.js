import { FadeIn, FadeOut } from "./fade";

const R = "Running";
const P = "Pause";
const F = "Finish";

class Game {
    constructor(ctx) {
        this._status = "P";
        this.ctx = ctx;
    }

    get status() {
        return this._status;
    }

    set status(s) {
        if (s === R || s === P || s === F) this._status === s;
        else console.error(`Invalid status: ${s}!`);
    }

    start() {
        this._status = "R";
    }

    generate() {
        
    }

    generateRandomLocs(n, xRange, yRange) {
        /**
         * n: 生成随机坐标的数量
         * xrange: 随机x坐标的范围
         * yrange: 随机y坐标的范围
         */
        let locs = new Array();
        for (let i = 0; i < n; i++) {
            locs.push({
                x: Math.floor(Math.random() * xRange),
                y: Math.floor(Math.random() * yRange)
            })
        }
        return locs;
    }


}

export { Game };