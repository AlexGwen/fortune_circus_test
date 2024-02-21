import {WinMessageBase} from "../../../casino/display/win/WinMessageBase";
import {GameConstStatic} from "../../GameConstStatic";
import {AppG} from "../../../casino/AppG";
import {AppConst} from "../../../casino/AppConst";

let _incAnim = false;

export class WinMessage extends WinMessageBase {
    constructor(graphic) {
        super(graphic);

        this._timeForLineValue = AppG.gameConst.game_const["timeShowMessage"];
        this._delayShowMess = AppG.gameConst.game_const["wait_for_win_mess"];
        this._tweenTxtCoef = AppG.gameConst.game_const["coef_for_up_txt"];
        this._txtScaleLvl = AppG.gameConst.game_const["scale_txt_lvl"];

        /** @type {OMY.OContainer} */
        let tempCanvas = graphic.getChildByName("c_canvas") ?? graphic;
        /** @type {OMY.OContainer} */
        this._labelCanvas = tempCanvas.getChildByName("c_label");
        /** @type {OMY.OSprite} */
        this._label = this._labelCanvas.canvas.getChildByName("s_label");
        this._labelCanvas.kill();

        /** @type {OMY.ORevoltParticleEmitter} */
        this._coins = graphic.getChildByName("re_coins_top");
        this._coins.kill();
        /** @type {OMY.OGraphic} */
        this._tint = graphic.getChildByName("r_tint");
        this._tint.visible = false;
        this._tint.interactive = true;

        // OMY.Omy.loc.addUpdate(this._locUpdate, this, false);
        AppG.sizeEmmit.on(AppConst.EMIT_RESIZE, this._resize, this);
        this._txtWin.lastText = ",";

        // AppG.emit.on(AppConst.APP_SHOW_BONUS_WIN, this._showBonusWinMessage, this);
        // OMY.Omy.addUpdater(this._update, this);
        this._txtWin.onStepInc = this._update.bind(this);
        this._winCoef = 0;

        if (this._gdConf.hasOwnProperty("active_debug")) {
            this._debugMessage = true;
            const debConst = this._gdConf["active_debug"].split(":");
            AppG.winCredit = debConst[1];
            AppG.winCoef = AppG.winCredit / AppG.serverWork.betForLimit;
            AppG.getTimeByWinValue(AppG.winCredit, AppG.gameConst.getData("gui_inc_conf"), true);
            switch (debConst[0]) {
                case this.C_TYPE_BIG: {
                    OMY.Omy.add.timer(0.6, this._showBigWinMessage, this);
                    break;
                }
                case this.C_TYPE_EPIC: {
                    OMY.Omy.add.timer(0.6, this._showEpicWinMessage, this);
                    break;
                }
                case this.C_TYPE_MEGA: {
                    OMY.Omy.add.timer(0.6, this._showMegaWinMessage, this);
                    break;
                }
                case this.C_TYPE_SUPER: {
                    OMY.Omy.add.timer(0.6, this._showSuperMegaWinMessage, this);
                    break;
                }

                default: {
                    OMY.Omy.add.timer(0.6, this._showSimpleWinMessage, this);
                    break;
                }
            }
        }
    }

    //-------------------------------------------------------------------------
    // PRIVATE
    //------------------------------------------------------------------------
    /**     * @private     */
    _resize() {
        if (this._coins.active) {
            this._coins.particle.settings.floorY = OMY.Omy.HEIGHT * 2;
        }

        this._tint && OMY.Omy.add.timer(0.001, this._updatePosOfTint, this, 3);
    }

    /**     * @private     */
    _updatePosOfTint() {
        let scale = 1 / this._graphic.scaleX;
        this._tint.width = OMY.Omy.WIDTH * scale;
        this._tint.height = OMY.Omy.HEIGHT * scale;
        this._tint.x = -this._graphic.x * scale;
        this._tint.y = -this._graphic.y * scale;
    }

    _showBonusWinMessage() {
        this._showWinMessage("bonus");
    }

    /**
     * Show win message
     * @param {string} [winSize="big_win"]
     */
    _showWinMessage(winSize = "big") {
        this._resize();
        super._showWinMessage(winSize);
        this._skiping = false;
        this._txtWin.visible = true;

        this._txtWin.alpha = 0;
        this._txtWin.setNumbers(0, false);
        OMY.Omy.remove.tween(this._txtWin);
        OMY.Omy.remove.tween(this._labelCanvas);
        this._labelCanvas.kill();
        AppG.emit.emit(AppConst.APP_START_INC_WIN, AppG.winCredit, AppG.incTimeTake);
        _incAnim = false;
        this._isCheckLimits = false;
        this._checkPartCount = 1;
        this._maxWinType = winSize;
        this._jsonTxt = (AppG.isBonusGame) ? this._gdConf["pos"]["bonus"] : this._gdConf["pos"]["win"];
        let pos;

        let winCoef = AppG.winCredit / AppG.serverWork.betForLimit;
        this._tweenTxt = winCoef >= this._tweenTxtCoef;
        this._onCheckTxtSize = false;

        switch (this._maxWinType) {
            case this.C_TYPE_BIG: {
                pos = this._jsonTxt["txt"]["big"];
                this._currentWinLvl = this.C_TYPE_BIG;
                AppG.showWinTime = AppG.incTimeTake;

                OMY.Omy.sound.play(GameConstStatic.S_take_take, true);
                this._txtWin.incSecond = AppG.incTimeTake;
                this._txtWin.setNumbers(AppG.winCredit, true);

                this._txtWin.scale.set(1);
                OMY.Omy.add.tween(this._txtWin, {
                    alpha: 1,
                    delay: this._delayShowMess,
                }, this._gdConf["time_show"], null);

                this._onCheckTxtSize = true;
                this._tweenFontSize = OMY.Omy.add.tween(this._txtWin, {fontSize: this._txtScaleLvl}, AppG.incTimeTake * 6);
                this._screenDelay = this._gdConf["screen_delay"];
                break;
            }
            case this.C_TYPE_EPIC: {
                OMY.Omy.navigateBtn.updateState(AppConst.C_BLOCK);
                this._timerDelayBlock = OMY.Omy.add.timer(0.5, () => {
                    OMY.Omy.navigateBtn.updateState(AppConst.C_WIN);
                }, this);
                this._tint.visible = true;
                this._tint.alpha = 0;

                pos = this._jsonTxt["txt"]["epic"];
                this._currentWinLvl = this.C_TYPE_WIN;
                this._checkPartCount = 2;
                this._txtWin.scale.set(0.5);
                this._screenDelay = this._gdConf["screen_delay"];
                AppG.showWinTime = AppG.incTimeTake + this._gdConf["bonus_delay"];
                OMY.Omy.sound.play(GameConstStatic.S_big_win, true);
                // if (AppG.state.fadeMainSound)
                //     OMY.Omy.sound.fadeTo(GameConstStatic.S_bg, 0.5, 0.35);
                this._isCheckLimits = true;
                this._needCoefLimit = (1 / this._checkPartCount) * AppG.winCoef;

                OMY.Omy.sound.play(GameConstStatic.S_take_take, true);
                this._txtWin.incSecond = AppG.incTimeTake;
                this._txtWin.setNumbers(AppG.winCredit, true);
                OMY.Omy.add.tween(this._txtWin, {
                    alpha: 1,
                    scaleX: this._gdConf["big_txt_scale"], scaleY: this._gdConf["big_txt_scale"],
                    ease: "back.out(1.7)",
                }, this._gdConf["time_show"], null);
                break;
            }

            default: {
                pos = this._jsonTxt["txt"]["none"];
                AppG.showWinTime = this._timeForLineValue;
                this._currentWinLvl = this.C_TYPE_WIN;
                this._txtWin.setNumbers(AppG.winCredit, false);
                this._txtWin.scale.set(1);
                OMY.Omy.add.tween(this._txtWin, {
                    alpha: 1,
                    delay: this._delayShowMess,
                }, this._gdConf["time_show"], null);
                this._screenDelay = 1;
            }
        }

        this._txtWin.fontSize = pos["font"];
        this._txtWin.x = pos.x;
        this._txtWin.y = pos.y;

        this._tint.visible && OMY.Omy.add.tween(this._tint, {alpha: 1}, 0.3);

        this._timeHideMessage = this._gdConf["time_hide"];
        if (!this._debugMessage)
            this._lineTimer = OMY.Omy.add.timer(AppG.showWinTime, this._hideWinMessage, this);

        AppG.updateGameSize(this._graphic);
        this._startHide = false;
        _incAnim = true;

        /*if (AppG.skippedWin &&
            (this._maxWinType === this.C_TYPE_BIG || this._maxWinType === this.C_TYPE_EPIC) &&
            this._timerForceSkip) {
            this._timerForceSkip.destroy();
            this._timerForceSkip = OMY.Omy.add.timer(this._gdConf["skip_big_win_time"], this._skipWinAnimations, this);
        }*/
    }

    /**     * @private     */
    _update(value) {
        if (this._isCheckLimits) {
            this._winCoef = value / AppG.serverWork.betForLimit;
            if (this._winCoef >= this._needCoefLimit) {
                this._changeWinLimit();
            }
        }
        if (this._onCheckTxtSize) {
            if (this._txtWin.width > this._txtWin.json.width) {
                this._tweenFontSize.kill();
                this._tweenFontSize = null;
                this._onCheckTxtSize = false;
            }

        }
    }

    /**     * @private     */
    _changeWinLimit() {
        let pos = null;
        switch (this._currentWinLvl) {
            case this.C_TYPE_WIN: {
                this._isCheckLimits = false;
                this._currentWinLvl = this.C_TYPE_EPIC;
                this._needCoefLimit = Number.MAX_VALUE;

                this._labelCanvas.revive();
                this._checkLock();
                this._labelCanvas.alpha = 0;

                pos = this._jsonTxt["txt"]["epic"];
                OMY.Omy.add.tween(this._txtWin, {
                    x: pos["move_x"],
                    y: pos["move_y"],
                    ease: "none"
                }, pos["m_time"]);
                OMY.Omy.add.tween(this._txtWin, {
                    scaleX: 1,
                    scaleY: 1,
                    ease: "none",
                    delay: pos["m_time"] + 0.15,
                }, pos["scale_time"], this._onShowBigLabel.bind(this));

                this._onCheckTxtSize = true;
                this._tweenFontSize = OMY.Omy.add.tween(this._txtWin, {fontSize: this._txtScaleLvl}, AppG.incTimeTake);

                this._coins.revive();
                this._coins.particle.settings.floorY = OMY.Omy.HEIGHT * 2;
                this._coins.addCompleted(this._needClearCoin, this, false);
                this._coins.start();
                break;
            }
        }
    }

    /**     * @private     */
    _onShowBigLabel() {
        this._labelCanvas.scale.set(this._gdConf["big_label_start_scale"]);
        OMY.Omy.add.tween(this._labelCanvas, {
            alpha: 1,
            ease: "none"
        }, this._gdConf["time_alpha_big"], null);
        OMY.Omy.add.tween(this._labelCanvas.scale, {
            x: this._gdConf["big_label_end_scale"], y: this._gdConf["big_label_end_scale"],
            ease: "none",
            onCompleteParams: [this._labelCanvas.scale, this._gdConf["time_show_big2"]]
        }, this._gdConf["time_show_big"], (scale, time) => {
            OMY.Omy.add.tween(scale, {x: 1, y: 1, delay: .05, ease: "none"}, time);
        });

        // OMY.Omy.add.tween(this._txtWin, {
        //     scaleX: 1.05,
        //     scaleY: 1.05,
        //     yoyo: true,
        //     repeat: -1,
        //     delay: this._gdConf["big_txt_loop_delay"],
        // }, this._gdConf["big_txt_loop_time"]);
    }

    /**     * @private     */
    _locUpdate() {
        this._checkLock();
    }

    /**     * @private     */
    _checkLock() {
        // this._label.texture = this._label.json["locTexture"][AppG.language];
        // this._labelCanvas.alignContainer();
    }

    _onCompleteIncWin() {
        this._isCheckLimits = false;
        if (_incAnim) {
            _incAnim = false;
            this._timerDelayBlock?.destroy();
            this._timerDelayBlock = null;
            OMY.Omy.sound.stop(GameConstStatic.S_take_take);
            if (OMY.Omy.sound.isSoundPlay(GameConstStatic.S_big_win)) {
                OMY.Omy.sound.stop(GameConstStatic.S_big_win);
                OMY.Omy.sound.play(GameConstStatic.S_big_win_END);
                // if (AppG.state.fadeMainSound)
                //     OMY.Omy.sound.fadeTo(GameConstStatic.S_bg, 0.5, 1);
            } else {
                OMY.Omy.sound.play(GameConstStatic.S_cash);
            }
            OMY.Omy.remove.tween(this._txtWin);
            OMY.Omy.add.tween(this._txtWin, {
                scaleX: 1.2,
                scaleY: 1.2,
                repeat: 1,
                yoyo: true
            }, 0.2);
            this._txtWin.stopInctAnimation();
            this._txtWin.setNumbers(this._txtWin.value);
            this._tweenFontSize?.kill();
            this._tweenFontSize = null;
            this._onCheckTxtSize = false;

            AppG.emit.emit(AppConst.APP_SHOW_WIN, (AppG.isRespin) ? AppG.totalWinInSpin : AppG.winCredit, true);
            super._onCompleteIncWin();
        }
    }

    /**     * @private     */
    _skipWinAnimations() {
        if (!this._graphic.visible) return;
        if (this._skiping) return;
        /*if (OMY.Omy.sound.isSoundPlay(GameConstStatic.S_big_win)) {
            OMY.Omy.sound.stop(GameConstStatic.S_big_win);
            OMY.Omy.sound.play(GameConstStatic.S_big_win_END);
            if (AppG.state.fadeMainSound)
                OMY.Omy.sound.fadeTo(GameConstStatic.S_bg, 0.5, 1);
        }*/
        this._onCompleteIncWin();

        this._lineTimer?.destroy();
        this._skiping = true;
        let forceEnd = false;

        let pos = null;
        switch (this._maxWinType) {
            case this.C_TYPE_EPIC: {
                forceEnd = true;
                !this._labelCanvas.active && this._labelCanvas.revive();
                OMY.Omy.remove.tween(this._labelCanvas);
                this._labelCanvas.scale.set(1);
                this._labelCanvas.alpha = 1;
                if (this._maxWinType !== this._currentWinLvl) {
                    pos = this._jsonTxt["txt"]["epic"];
                    this._txtWin.setXY(pos["move_x"], pos["move_y"]);
                }
                break;
            }
        }
        this._currentWinLvl = this._maxWinType;
        this._screenDelay = 0.5;
        if (!this._startHide) {
            // OMY.Omy.remove.tween(this._txtWin);
            this._txtWin.alpha = 1;
            // this._txtWin.scale.set(1);
            if (forceEnd) OMY.Omy.add.timer(this._gdConf["skip_bigWin_delay"], this._hideWinMessage, this);
            else this._hideWinMessage();
        }/* else {
            this._messageClear();
        }*/
    }

    /**     * @private     */
    _needClearCoin() {
        this._coins.kill();
    }

    _hideWinMessage() {
        this._onCompleteIncWin();

        this._coins.active && this._coins.stop();
        this._isCheckLimits = false;
        this._lineTimer?.destroy();
        this._startHide = true;
        // OMY.Omy.remove.tween(this._txtWin);
        OMY.Omy.remove.tween(this._labelCanvas);
        this._timerHideDelay = OMY.Omy.add.timer(this._screenDelay, this._delayHideMess, this);
    }

    /**     * @private     */
    _delayHideMess() {
        this._timerHideDelay = null;
        switch (this._maxWinType) {
            case this.C_TYPE_WIN:
            case this.C_TYPE_BIG: {
                OMY.Omy.add.tween(this._txtWin, {
                    alpha: 0,
                    ease: "none",
                }, this._timeHideMessage, this._messageClear.bind(this));
                break;
            }

            default: {
                OMY.Omy.add.tween(this._txtWin, {
                    alpha: 0,
                    scaleX: this._gdConf["hide_scale"], scaleY: this._gdConf["hide_scale"],
                    ease: "none",
                }, this._timeHideMessage, this._messageClear.bind(this));
            }
        }

        if (this._labelCanvas.active) {
            OMY.Omy.add.tween(this._labelCanvas, {
                alpha: 0,
                ease: "none",
            }, this._timeHideMessage);
        }
        this._tint.visible && OMY.Omy.add.tween(this._tint, {alpha: 0}, 0.3);
        AppG.emit.emit(GameConstStatic.WIN_MESSAGE_HIDE);
    }

    _messageClear() {
        this._timerHideDelay?.destroy();
        this._timerHideDelay = null;
        this._lineTimer?.destroy();
        OMY.Omy.remove.tween(this._txtWin);
        OMY.Omy.remove.tween(this._labelCanvas);
        OMY.Omy.remove.tween(this._tint);
        this._labelCanvas.kill();
        this._tint.visible = false;
        AppG.emit.emit(AppConst.APP_STOP_WIN_PARTICLES);
        super._hideWinMessage();
    }

    static get incAnim() {
        return _incAnim;
    }
}
