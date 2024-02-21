import {SlotSymbolBase} from "../../../casino/display/reels/SlotSymbolBase";
import {GameConstStatic} from "../../GameConstStatic";
import {AppG} from "../../../casino/AppG";
import { AppConst } from './../../../casino/AppConst';

export class SlotSymbol extends SlotSymbolBase {
    constructor(reelIndex, reelParent, symbolIndex) {
        super(reelIndex, reelParent, symbolIndex);
        this.blockSymbName = this._gdConf["blockSymbName"];
        this.blockAlpha = this._gdConf["block_alpha"];
        this._checkSymbolPos = false;
        this.isUpdate = true;

        AppG.emit.on(GameConstStatic.CHECK_IDL_SYMB_EFFECT, this._onCheckIdle, this);
        AppG.emit.on(GameConstStatic.REMOVE_IDLE_SYMB_EFFECT, this._removeEffect, this);
    }

    _startSpin() {
        if (!this._spinning) {
            if (this._blurInReelAnimation) {
                if (this._startBlurTime)
                    this._startTimerBlur = OMY.Omy.add.timer(this._startBlurTime * this._turboCoef, this.updateStateImg, this, 0,
                        false, true, 0, [AppConst.SLOT_SYMBOL_BLUR]);
                else this.updateStateImg(AppConst.SLOT_SYMBOL_BLUR);
            }
            this._spinning = true;
            this._symbolS.visible = true;
        }
    }

    _addEffect() {
        this._effect = OMY.Omy.add.actorJson(this, this._gdConf[this._imageName]);
        // this._effect.setMixByName("items/wild_start", "items/wild_idle", 0.25);
        // this._effect.setMixByName("items/wild_idle", "items/wild_win", 0.2);
    }

    /**     * @private     */
    _onCheckIdle() {
        if (this._isFocus && this._gdConf[this._imageName]) {
            if (!this._effect) {
                this._symbolS.visible = false;
                /** @type {OMY.OActorSpine} */
                this._addEffect();
                if (this._imageName === "@") {
                    AppG.emit.emit(GameConstStatic.E_SANTA_ON_SCREEN, this._reelIndex, this);
                    this._effect.alpha = 0;
                }
                this._onPlayIdle();
            }

        }
    }

    //-------------------------------------------------------------------------
    // PRIVATE
    //-------------------------------------------------------------------------
    _playStopEffect() {
        if (this._gdConf[this._imageName] && this._isFocus) {
            this._symbolS.visible = false;
            if (!this._effect)
                /** @type {OMY.OActorSpine} */
                this._effect = OMY.Omy.add.actorJson(this, this._gdConf[this._imageName]);
            this._effect.gotoAndPlay(0);
            this._effect.addComplete(this._onPlayIdle, this, true);
            OMY.Omy.sound.play(GameConstStatic.S_wild_drop);
            AppG.emit.emit(GameConstStatic.E_WILD_ON_SCREEN, this._reelIndex);
        }
    }

    /**     * @private     */
    _onPlayIdle() {
        if (this._effect) {
            const conf = this._effect.json["idle"];
            this._effect.gotoAndPlay(0, true, conf["custom_a_name"]);
            this._effect.parentGroup = AppG.stage.layer2;
           
            this._effect.x = conf.dx;
            this._effect.y = conf.dy;
            this._effect.scale.set(conf.scale);
            this._effect.speed = conf.speed;
        }
    }

    _blurState() {
        this._removeEffect();
        super._blurState();
    }

    /**     * @private     */
    _removeEffect() {
        if (this._effect) {
            this._effect.stop();
            this._effect.kill();
            this._effect = null;
            this._symbolS.visible = true;
        }
    }

    _winEffect() {
        // OMY.Omy.remove.tween(this);
        // this.alpha = 1;
        super._winEffect();
    }

    _noWinState() {
        super._noWinState();
        // this._removeEffect();
        if (this._effect) {
            this._effect.visible = false;
            this._symbolS.visible = true;
        }
        /*if (this._respinSpine && this._respinSpine.alpha === 1) {
                  OMY.Omy.remove.tween(this._respinSpine);
                  OMY.Omy.add.tween(this._respinSpine, {alpha: this.blockAlpha}, 0.3);
              }*/
        // if (this.alpha === 1) {
        //     OMY.Omy.remove.tween(this);
        //     OMY.Omy.add.tween(this, {alpha: this.blockAlpha}, 0.3);
        // }
        // this._stateName = this.blockSymbName;
    }

    _defeatState() {
        /*if (this._respinSpine) {
            OMY.Omy.remove.tween(this._respinSpine);
            if (this._respinSpine.alpha !== 1)
                OMY.Omy.add.tween(this._respinSpine, {alpha: 1}, 0.3);
        }*/
        // if (this.alpha !== 1) {
        //     OMY.Omy.remove.tween(this);
        //     OMY.Omy.add.tween(this, {alpha: 1}, 0.3);
        // }
        // this._removeEffect();
        if (this._effect) {
            this._effect.visible = true;
            this._symbolS.visible = false;
        }
        if (this._symbolBg) {
            this._symbolBg.destroy();
            this._symbolBg = null;
        }
        super._defeatState();
    }

    /*updateStateImg(st) {
        if (this._isHold || this._isRespinHold) {
            if (st === AppConst.SLOT_SYMBOL_NO_WIN)
                this._noWinState();
            if (st === AppConst.SLOT_SYMBOL_NONE || st === AppConst.SLOT_SYMBOL_WIN) {
                this._defeatState();
            }
            return;
        }
        return super.updateStateImg(st);
    }*/

    /*scatterFree(loop = false) {
        if (AppG.gameConst.isScatterSymbol(this._imageName)) {
            this._symbolS.visible = false;
            /!** @type {OMY.OActorSpine} *!/
            this._effect = OMY.Omy.add.actorJson(this, this._gdConf["scatter"]);
            if (!loop)
                this._effect.totalLoop = 2;
            this._effect.gotoAndPlay(0, true);
        }
    }*/

    /*updateImg() {
        let result = super.updateImg();
        if (this._imageName === "A" && !this._debugImg) {
            this._debugImg = OMY.Omy.add.actorJson(this, this._gdConf["wild"]);
            this._debugImg.play(true);
        }
        return result;
    }*/

    setSymbol(sName = null) {
        // sName = "J";
        this._checkSymbolPos = false;
        /* if (this._reelIndex === AppG.state.mainView.activeWaitReelIndex && !sName) {
             if (--SlotSymbol.countNotWild[this._reelIndex] <= 0) {
                 sName = "A";
                 SlotSymbol.countNotWild[this._reelIndex] = OMY.OMath.randomRangeInt(
                     AppG.gameConst.game_const["count_not_wild"][0],
                     AppG.gameConst.game_const["count_not_wild"][1]);
             }
         }*/
        let result = super.setSymbol(sName);
        if (sName && AppG.isMoveReels && this._imageName === "A") {
            // this._checkSymbolPos = true;
            AppG.emit.emit(GameConstStatic.SYMBOL_ON_REEL, this._reelIndex);
        }
        return result;
    }

//-------------------------------------------------------------------------
    // PUBLIC
    //-------------------------------------------------------------------------

    update() {
        super.update();
        if (this._checkSymbolPos && this.y > 100) {
            this._checkSymbolPos = false;
            AppG.emit.emit(GameConstStatic.SYMBOL_ON_REEL, this._reelIndex);
        }
    }

    set isFocus(value) {
        if (this._effect) return;
        if(!value) {
            !!this._effect && (this._effect.visible = false);
            !!this._symbolS && (this._symbolS.visible = false);
        }
        this._isFocus = value;
    }

    get isFocus() {
        return super.isFocus;
    }
}
