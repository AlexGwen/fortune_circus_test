import {LogoGameBase} from "../../casino/display/LogoGameBase";
import {AppG} from "../../casino/AppG";
import {AppConst} from "../../casino/AppConst";
import {GameConstStatic} from "../GameConstStatic";

export class LogoGame extends LogoGameBase {
    constructor(graphic) {
        super(graphic);

        /** @type {OMY.OActorSpine} */
        // this._aSpine = this._graphic.getChildByName("a_logo");
        // this._aSpine.gotoAndStop(0);
        // this._aSpine.visible = false;
        // this._aSpine.addComplete(this._showStaticLogo, this, false);
        // /** @type {OMY.OSprite} */
        // this._sLogo = this._graphic.getChildByName("s_game_logo_small");

        // OMY.Omy.loc.addUpdate(this._updateLoc, this, false);
        // this._updateLoc();

        // AppG.emit.on(AppConst.EMIT_WIN, this._playWinEffect, this);
        // this._delayIdleEffect();

        // this._aSpine.parentGroup = AppG.stage.layer5
    }

    /**     * @private     */
    _playWinEffect() {
        this._clearTimer();
        this._aSpine.gotoAndPlay(0, false, this._aSpine.json["win_anim"]);
        this._aSpine.addComplete(this._delayIdleEffect, this, true);
    }

    /**     * @private     */
    _clearTimer() {
        this._timerIdl?.destroy();
        this._timerIdl = null;
    }

    /**     * @private     */
    _delayIdleEffect() {
        this._clearTimer();
        this._timerIdl = OMY.Omy.add.timer(OMY.OMath.randomRangeNumber(4, 15),
            this.logoIdl, this);
    }

    /**     * @private     */
    logoIdl() {
        this._aSpine.gotoAndPlay(0, false, this._aSpine.json["custom_a_name"]);
        this._delayIdleEffect();
    }

    startIntroAnim() {
        this._clearTimer();
        this._aSpine.visible = false;
    }

    continueIntroAnim() {
        OMY.Omy.sound.play(GameConstStatic.S_play_logo_show);
        this._aSpine.visible = true;
        this._aSpine.alpha = 1;
        // OMY.Omy.add.tween(this._aSpine, {alpha: 1}, 0.3);

        this._aSpine.gotoAndPlay(0, false, this._aSpine.json["win_anim"]);
        this._delayIdleEffect();
    }

    /**     * @private     */
    _updateLoc() {
        // this._tRespinField.text = OMY.Omy.loc.getText("gui_respin") + ": " + String(AppG.serverWork.respinsCount);
        // this._updateLockRespin();
        // this._textCanvas.alignContainer();
    }

    /*/!**     * @private     *!/
    _updateLockRespin() {
        if (!this._sRespin.visible) return;
        for (let key in this._sRespin.json["loc"]) {
            if (OMY.OMath.inArray(this._sRespin.json["loc"][key], AppG.language)) {
                this._sRespin.texture = key;
                break;
            }
        }
    }*/
}
