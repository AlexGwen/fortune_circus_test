import { AppG } from "../../../casino/AppG";
import {SymbolEffectBase} from "../../../casino/display/win/SymbolEffectBase";

export class SymbolEffect extends SymbolEffectBase {
    constructor() {
        super();
        // this._bgLayer = OMY.Omy.add.container(this);
        if (this._gdConf["bg"])
            this._bg = OMY.Omy.add.spriteJson(this._bgLayer, this._gdConf["bg"]);
        this._animLayer = OMY.Omy.add.container(this);
        this._animLayer.parentGroup = AppG.stage.layer3;
        this._frameLayer = OMY.Omy.add.container(this);
        if (this._gdConf["frame_stat"])
            this._frame = OMY.Omy.add.spriteJson(this, this._gdConf["frame_stat"]);
    }

    kill() {
        if (this._particle) {
            this._particle.destroy();
            this._particle = null;
        }
        if (this._actor) {
            OMY.Omy.remove.tween(this._actor);
            this._actor = null;
        }

        if (this._animFrame) {
            OMY.Omy.remove.tween(this._animFrame);
            this._animFrame = null;
        }

        super.kill();
    }

    /**
     * @param {WinSymbolD}winData
     * @param {Number}id
     * @param {Boolean}isSkiped
     * @param {Boolean}isLoop
     */
    showSymbol(winData, id, isSkiped, isLoop) {
        // if (winData.symbol === "A" && !isLoop) return;
        super.showSymbol(winData, id, isSkiped, isLoop);
        this._winData = winData;
        // const reelId = winData.reelId;
        // const symbolId = winData.symbolId;
        const symbolChar = winData.symbol;
        const isScatter = winData.isScatter;
        const isWild = winData.isWild;
        const wildMulti = winData.wildMulti;
        const multiValue = winData.multi;
        // const countSymbol = winData.countSymbol;
        // const credit = winData.credit;
        const isWin = winData.isWin;
        const winSymbol = winData.winSymbol;
        // const isScatterWin = AppG.gameConst.isScatterSymbol(winSymbol);
        const winWithMulti = multiValue > 1;

        // if (this._bg)
        //     this._bg.texture = (AppG.isFreeGame) ? this._bg.json.free : this._bg.json.texture;
        if (isWin) {
            /** @type {OMY.OActorSpine} */
            this._actor = OMY.Omy.add.actorJson(this._animLayer, this._gdConf[symbolChar]);
            this._actor.gotoAndPlay(0, true);

            this._actor.parentGroup = AppG.stage.layer3;
            if (isLoop) {
                this._countLoop = 0;
                this._actor.addLoop(this._onLoopEffect, this);
                // if (symbolChar !== "A") {
                this._animFrame = OMY.Omy.add.actorJson(this._frameLayer, this._gdConf["frame"]);
                this._animFrame.gotoAndPlay(0, true);
                // }
            }
        }
    }

    /**     * @private     */
    _onLoopEffect() {
        if (++this._countLoop >= 2) {
            this._actor.removeLoop(this._onLoopEffect, this);
            this._actor.stop();
        }
    }

    /**
     * @returns {WinSymbolD}
     */
    get winData() {
        return this._winData;
    }
}