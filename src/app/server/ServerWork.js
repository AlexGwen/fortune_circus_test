import {ServerWorkBase} from "../../casino/server/ServerWorkBase";
import {AppG} from "../../casino/AppG";

export class ServerWork extends ServerWorkBase {
    constructor() {
        super();
        this._recoverMode = false;
    }

    gameConfHandler(e) {
        super.gameConfHandler(e);
    }

    _updateWinData(packet) {
        if (packet.result.wons && packet.result.wons.length) {
            /** @type {Array} */
            let buffer = packet.result.wons.concat();
            packet.result.wons.length = 0;
            let line, serverLine = AppG.gameConst.getData("figures");
            let countSymbol = AppG.gameConst.countSlot;
            for (let i = 0; i < countSymbol; i++) {
                for (let j = 0; j < buffer.length; j++) {
                    line = serverLine[buffer[j]["lineNum"]];
                    if (line[0] === i) packet.result.wons.push(buffer[j]);
                }
            }
        }
        super._updateWinData(packet);
    }

    /**     * @private     */
    _array2Matrix(array) {
        if (!array) return null;
        const result = [];
        for (let i = 0; i < array.length; i++) {
            // let col = i % this._totalReel;
            let col = Math.floor(i / this._totalReel);
            if (!result[col]) result[col] = [];
            result[col].push(array[i]);
        }
        return result;
    }

    updateBonusWin() {
        // this._totalWinInSpin += this._bonusWin;
        // this._totalWinInGame += this._bonusWin;
    }

    sendSpin(buyFreeSpin = false) {
        if (this._recoverMode) this._recoverMode = false;
        return super.sendSpin(buyFreeSpin);
    }

//---------------------------------------
/// ACCESSOR
//---------------------------------------
    get recoverMode() {
        return this._recoverMode;
    }

    set recoverMode(value) {
        this._recoverMode = value;
    }
}
