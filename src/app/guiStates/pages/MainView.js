import {GameConstStatic} from "../../GameConstStatic";
import {Background} from "../../display/Background";
import {MainViewBase} from "../../../casino/gui/pages/MainViewBase";
import {AppG} from "../../../casino/AppG";
import {AppConst} from "../../../casino/AppConst";
import {LineInGame} from "../../display/LineInGame";

export class MainView extends MainViewBase {
    constructor() {
        super();
        this.parentGroup = AppG.stage.layer1;
        /** @type {ReelBlock} */
        this._reelBlock = null;
        AppG.emit.on(AppConst.APP_HIDE_WIN_EFFECT, this._cleanWinEffect, this);
        AppG.emit.on(AppConst.APP_EMIT_STOP_ALL_EASE_REEL, this._easeStopAllReels, this);
        // AppG.emit.on(AppConst.APP_WAIT_REEL, this._stopWaitSymbolReel, this);
    }

    revive() {
        this._bgGraphic = this.getChildByName("c_game_bg");

        this._reelGraphic = this.getChildByName("reels").getChildByName("reel_canvas");
        this._bgParticle = this.getChildByName("c_game_bg_particle");
        /** @type {OMY.OGraphic} */
        this._reelWinTint = this.getChildByName("reels").getChildByName("r_win_tint");
        this._reelWinTint.alpha = 0;

        super.revive();

        if (AppG.gameConst.gameHaveIntroInformation) {
            OMY.Omy.navigateBtn.updateState(AppConst.C_BLOCK);
            this._startIntroInfo();
        } else if (AppG.gameConst.gameHaveIntro) {
            OMY.Omy.add.timer(AppG.gameConst.getData("game_const")["intro_delay_time"], this._startIntro, this);

            this._logo.startIntroAnim();
            OMY.Omy.navigateBtn.updateState(AppConst.C_BLOCK);
        }

        OMY.Omy.sound.stop(GameConstStatic.S_game_bg);
        OMY.Omy.sound.stop(GameConstStatic.S_bg);
        GameConstStatic.S_game_bg = GameConstStatic.S_bg;
        OMY.Omy.sound.play(GameConstStatic.S_game_bg, true);

        OMY.Omy.sound.pauseAll();
        OMY.Omy.sound.resumeAll();
    }

    /**     * @private     */
    _startIntro() {
        // this._introBgSpine.gotoAndPlay(0);
        // this._introBgSpine.visible = true;
        // this._introBgSpine.removeOnEnd = true;
        // this._introBgSpine = null;

        // this._introTint.visible = true;
        // this._introTint.alpha = 0;
        // OMY.Omy.add.tween(this._introTint, {alpha: 1}, 0.1);
        OMY.Omy.viewManager.showWindow(
            AppConst.W_INTRO,
            true,
            OMY.Omy.viewManager.gameUI.getWindowLayer("c_intro_layer")
        );
    }

    /**     * @private     */
    _startIntroInfo() {
        OMY.Omy.viewManager.showWindow(AppConst.W_INTRO_INFO, true);
    }

    _createGraphic() {
        this.bg = new Background(this._bgGraphic);
        super._createGraphic();

        /** @type {OMY.OActorSpine} */
        // this._introBgSpine = this.getChildByName("s_game_bg");
        // this._introBgSpine.gotoAndStop(0);
        // this._introBgSpine.visible = false;

        /** @type {OMY.OActorSpine} */
        // this._bgSpine = this.getChildByName("c_game_bg2").getChildByName("a_bg");
        // this._bgSpine.gotoAndStop(0);
        // this._bgSpine.alpha = 0;
        // this._bgSpine.addComplete((actor) => {
        //     actor.gotoAndPlay(0, true, actor.json["custom_a_name"]);
        // }, this, false);
        /** @type {OMY.OActorSpine} */
        // this._aReelDown = this.getChildByName("reels").getChildByName("a_reel_down");
        // this._aReelDown.gotoAndStop(0);
        // this._aReelDown.alpha = 0;
        // this._aReelDown.addComplete((actor) => {
        //     OMY.Omy.add.tween(actor, {alpha: 0}, 0.1);
        // }, this, false);
        /** @type {OMY.OActorSpine} */
        // this._aReelTop = this.getChildByName("reels").getChildByName("a_reel_top");
        // this._aReelTop.gotoAndStop(0);
        // this._aReelTop.alpha = 0;
        // this._aReelTop.addComplete((actor) => {
        //     OMY.Omy.add.tween(actor, {alpha: 0}, 0.1);
        // }, this, false);

        /** @type {LineInGameParticle} */
        this._lineInGame = new LineInGame(this.getChildByName("c_numbers"), this._reelBlock.activeList);
        this._lineInGame.linesGraphic = this.getChildByName("c_lines");
        // this._lineInGame.hide();

        // /** @type {OMY.OContainer} */
        // this._reelWaitCanvas = this.getChildByName("reels").getChildByName("c_effects");
        // this._reelWaitCanvas.setAll("visible", false);
        this._isWaitEffect = false;

        if (this.getChildByName("reels").getChildByName("c_coins")) {
            /** @type {OMY.OContainer} */
            this._reelCoinsCanvas = this.getChildByName("reels").getChildByName("c_coins");
            // for (let i = 0; i < this._reelCoinsCanvas.children.length; i++) {
            //     /** @type {OMY.OActorSpine} */
            //     let actor = this._reelCoinsCanvas.children[i];
            //     actor.visible = false;
            //     actor.addComplete((actor) => {
            //         actor.visible = false;
            //     }, this, false);
            //     actor.userData = i;
            // }
            /** @type {Array.<OMY.OTicker>} */
            this._isCoinsMatrix = [null, null, null, null, null];

            /** @type {OMY.OContainer} */
            this._reelLightCanvas = this.getChildByName("reels").getChildByName("c_light");
            // for (let i = 0; i < this._reelLightCanvas.children.length; i++) {
            //     /** @type {OMY.OActorSpine} */
            //     let actor = this._reelLightCanvas.children[i];
            //     actor.visible = false;
            //     actor.addComplete((actor) => {
            //         actor.visible = false;
            //     }, this, false);
            //     actor.userData = i;
            // }
            /** @type {Array.<OMY.OTicker>} */
            this._isLightMatrix = [null, null, null, null, null];
            AppG.emit.on(GameConstStatic.SYMBOL_ON_REEL, this._wildOnScreen, this);
        }

        this._logoAnimation = this.getChildByName("reels").getChildByName("drum");
        this._logoAnimation.visible = true;
        this._logoAnimation.gotoAndPlay(0, true);

        /** @type {OMY.OContainer} */
        this._reelsCanvas = this.getChildByName("reels");
        // if (!AppG.isHaveJackpot && !OMY.Omy.isDesktop) {
        //     this._reelsCanvas.getChildByName("s_main_frame_2").destroy();
        //     this._reelsCanvas.getChildByName("s_main_frame_3").destroy();
        // }

        this._delayForWinMess = this._gdConf["wait_for_win_mess"];

        // AppG.emit.on(AppConst.EMIT_NEXT_FREE, this._updateFire, this);

        /** @type {OMY.OGraphic} */
        // this._introTint = this.getChildByName("r_tint_intro");
        // this._introTint.visible = false;
        AppG.emit.emit(GameConstStatic.CHECK_IDL_SYMB_EFFECT);

        OMY.Omy.navigateBtn.addUpdateState(this._onUpdateBtnState, this);
        AppG.emit.on(GameConstStatic.E_WILD_ON_SCREEN, this._wildOnScreenStop, this);
        this._wildReels = [0, 0, 0, 0, 0];
    }

    /**     * @private     */
    _stopAndHideBgSpine() {
        // this._bgSpine.stop();
        // OMY.Omy.add.tween(this._bgSpine, {alpha: 0}, 0.3);
        // this._bgSpineTimerDelay = null;
    }

    _updateGameSize(dx, dy, isScreenPortrait) {
        super._updateGameSize(dx, dy, isScreenPortrait);
        // if (this._introTint) {
        //     this._introTint.x = -this.x;
        //     this._introTint.y = -this.y;
        //     this._introTint.width = OMY.Omy.WIDTH;
        //     this._introTint.height = OMY.Omy.HEIGHT;
        // }
    }

    // region spin:
    //-------------------------------------------------------------------------
    sendSpin() {
        AppG.emit.emit(GameConstStatic.REMOVE_IDLE_SYMB_EFFECT);
        OMY.Omy.sound.play(GameConstStatic.S_reel_bg, true);
        this._countWild = 0;
        this._wildReels.map((a, index, array) => (array[index] = 0));
        if (OMY.Omy.sound.isSoundPlay(GameConstStatic.S_intro)) OMY.Omy.sound.stop(GameConstStatic.S_intro);
        this._activeWaitReelIndex = -1;

        super.sendSpin();

        // OMY.Omy.remove.tween(this._bgSpine);
        // OMY.Omy.add.tween(this._bgSpine, {alpha: 1}, 0.1);
        // !this._bgSpine.playing && this._bgSpine.play(true, this._bgSpine.json["custom_a_name"]);
        // if (this._bgSpineTimerDelay) {
        //     this._bgSpineTimerDelay.destroy();
        //     this._bgSpineTimerDelay = null;
        // }
    }

    onSendSpin() {
        super.onSendSpin();
    }

    skipSpin() {
        // this._clearWaitEffect();
        if (AppG.isMoveReels) {
            this._needOnWildWait = false;
            if (OMY.Omy.sound.isSoundPlay(GameConstStatic.S_reel_bg)) {
                OMY.Omy.sound.stop(GameConstStatic.S_reel_bg);
            }
        }
        super.skipSpin();
    }

    /**     * @private     */
    _easeStopAllReels() {
        if (OMY.Omy.sound.isSoundPlay(GameConstStatic.S_reel_bg)) OMY.Omy.sound.stop(GameConstStatic.S_reel_bg);
        AppG.emit.emit(AppConst.APP_EMIT_SKIP_BLOCK);
    }

    _spinEnd() {
        super._spinEnd();
        this._clearWaitEffect();
        if (OMY.Omy.sound.isSoundPlay(GameConstStatic.S_wild_wait)) OMY.Omy.sound.stop(GameConstStatic.S_wild_wait);
        // if (!AppG.serverWork.isWinSpin)
        //     this._bgSpineTimerDelay = OMY.Omy.add.timer(this._gdConf["timer_delay_bg_spine"], this._stopAndHideBgSpine, this);
    }

    _onReelStops(reelId) {
        super._onReelStops(reelId);

        if (Boolean(this._isCoinsMatrix[reelId])) {
            this._isCoinsMatrix[reelId].destroy();
            this._isCoinsMatrix[reelId] = null;
            if (AppG.skipped) {
                /** @type {OMY.OActorSpine} */
                let actor = this._reelCoinsCanvas.getChildByName("reel_" + String(reelId));
                OMY.Omy.add.tween(actor, {alpha: 0, onCompleteParams: [actor]}, 0.2, (actor) => {
                    actor.alpha = 1;
                    actor.visible = false;
                    actor.stop();
                });
            }
        }
        if (Boolean(this._isLightMatrix[reelId])) {
            this._isLightMatrix[reelId].destroy();
            this._isLightMatrix[reelId] = null;
            if (AppG.skipped) {
                /** @type {OMY.OActorSpine} */
                let actor = this._reelLightCanvas.getChildByName("reel_" + String(reelId));
                OMY.Omy.add.tween(actor, {alpha: 0, onCompleteParams: [actor]}, 0.2, (actor) => {
                    actor.alpha = 1;
                    actor.visible = false;
                    actor.stop();
                });
            }
        }
    }

    /**     * @private     */
    _onReelEaseStops(reelId) {
        super._onReelEaseStops(reelId);
        // this._checkCoinsEffect();
    }

    //-------------------------------------------------------------------------
    //endregion

    // region scatter wait:
    //-------------------------------------------------------------------------
    /**     * @private     */
    _stopWaitSymbolReel(reelId, waitSymbol) {
        if (!this._isWaitEffect) {
            this._isWaitEffect = true;
            /*for (let i = 0; i < reelId; i++) {
                for (let j = 0; j < this._reelBlock.activeList[i].length; j++) {
                    this._reelBlock.activeList[i][j].holdSymbol();
                }
            }*/
        } /*else {
             for (let j = 0; j < this._reelBlock.activeList[reelId - 1].length; j++) {
                 this._reelBlock.activeList[reelId - 1][j].holdSymbol();
             }
         }*/
        this._offWaitEffect();
        this._onWaitEffect(reelId);
    }

    /**     * @private     */
    _offWaitEffect() {
        if (this._activeWaitEffect) {
            OMY.Omy.remove.tween(this._activeWaitEffect);
            OMY.Omy.add.tween(
                this._activeWaitEffect,
                {
                    alpha: 0,
                    onCompleteParams: [this._activeWaitEffect],
                },
                this._reelWaitCanvas.json["alpha_time"],
                (spine) => {
                    spine.stop();
                    spine.visible = false;
                }
            );
            this._activeWaitEffect = null;
        }
    }

    /**     * @private     */
    _onWaitEffect(reelId) {
        if (!OMY.Omy.sound.isSoundPlay(GameConstStatic.S_wild_wait))
            OMY.Omy.sound.play(GameConstStatic.S_wild_wait, true);
        this._activeWaitReelIndex = reelId;
        this._reelBlock._reelList[reelId].stopMoveSpeed();
        this._activeWaitEffect = this._reelWaitCanvas.getChildByName("reel_" + String(reelId));
        OMY.Omy.remove.tween(this._activeWaitEffect);
        this._activeWaitEffect.visible = true;
        this._activeWaitEffect.alpha = 0;
        this._activeWaitEffect.gotoAndPlay(0, true);
        OMY.Omy.add.tween(this._activeWaitEffect, {alpha: 1}, this._reelWaitCanvas.json["alpha_time"]);
    }

    /**     * @private     */
    _clearWaitEffect() {
        if (this._isWaitEffect) {
            OMY.Omy.sound.stop(GameConstStatic.S_scatter_wait);
            for (let i = 0; i < this._reelBlock.activeList.length; i++) {
                for (let j = 0; j < this._reelBlock.activeList[i].length; j++) {
                    this._reelBlock.activeList[i][j].unHoldSymbol();
                }
            }
            this._isWaitEffect = false;
            this._needOnWildWait = false;
            this._activeWaitReelIndex = -1;
            this._offWaitEffect();
        }
    }

    //-------------------------------------------------------------------------
    //endregion
    // region :wild on screen
    //-------------------------------------------------------------------------
    /**     * @private     */
    _wildOnScreen(reelIndex) {
        if (!Boolean(this._isCoinsMatrix[reelIndex])) {
            this._isCoinsMatrix[reelIndex] = OMY.Omy.add.timer(
                this._gdConf["time_delay_coins"],
                this._addCoinsEffect,
                this,
                0,
                false,
                true,
                0,
                [reelIndex]
            );
        }
        if (!Boolean(this._isLightMatrix[reelIndex])) {
            this._isLightMatrix[reelIndex] = OMY.Omy.add.timer(
                this._gdConf["time_for_new_coins"],
                this._clearLightMatrix,
                this,
                0,
                false,
                true,
                0,
                [reelIndex]
            );
            /** @type {OMY.OActorSpine} */
            // let actor = this._reelLightCanvas.getChildByName("reel_" + String(reelIndex));
            // OMY.Omy.remove.tween(actor);
            // actor.visible = true;
            // actor.alpha = 1;
            // actor.gotoAndPlay(0, false);
            OMY.Omy.sound.play(GameConstStatic.S_fly_coins);
        }
    }

    /**     * @private     */
    _addCoinsEffect(reelIndex) {
        this._isCoinsMatrix[reelIndex] = OMY.Omy.add.timer(
            this._gdConf["time_for_new_coins"],
            this._clearCoinsMatrix,
            this,
            0,
            false,
            true,
            0,
            [reelIndex]
        );
        /** @type {OMY.OActorSpine} */
        // let actor = this._reelCoinsCanvas.getChildByName("reel_" + String(reelIndex));
        // OMY.Omy.remove.tween(actor);
        // actor.visible = true;
        // actor.alpha = 1;
        // actor.gotoAndPlay(0, false);
        OMY.Omy.sound.play(GameConstStatic.S_fly_coins);
    }

    /**     * @private     */
    _clearCoinsMatrix(reelIndex) {
        this._isCoinsMatrix[reelIndex] = null;
    }

    /**     * @private     */
    _clearLightMatrix(reelIndex) {
        this._isLightMatrix[reelIndex] = null;
    }

    /**     * @private     */
    _wildOnScreenStop(reelIndex) {
        if (!Boolean(this._wildReels[reelIndex])) {
            this._wildReels[reelIndex] = 1;
            OMY.Omy.Ease.removeEase(this);
            let ease = OMY.Omy.Ease.add(
                this,
                this._gdConf[AppG.isScreenPortrait ? "shake_reel_wild_v" : "shake_reel_wild"],
                this._gdConf["shake_option_reel_wild"]
            );
            ease.once("complete", this._endShakeReels, this);

            this._countWild++;
            this._countWild = this._countWild >= 3 ? this._countWild : this._countWild;
            OMY.Omy.sound.play(GameConstStatic["S_wild_drop" + String(this._countWild)]);
        }
    }

    //-------------------------------------------------------------------------
    //endregion
    // region BONUS GAME: WHEEL
    //-------------------------------------------------------------------------

    _startBonusGame() {
        AppG.emit.once(AppConst.APP_BONUS_CLOSE, this._onEndBonusGame, this);

        super._startBonusGame();
        this._logo.startBonusGame();
        OMY.Omy.add.tween(this.getChildByName("reels"), {alpha: 0, delay: 1}, this._gdConf["time_hide_reel"], null);
    }

    _continueShowBonus() {
        OMY.Omy.viewManager.showWindow(
            AppConst.W_BONUS,
            true,
            OMY.Omy.viewManager.gameUI.getWindowLayer("c_wheel_layer")
        );
        // super._continueShowBonus();
    }

    /**     * @private     */
    _onEndBonusGame() {
        this._logo.endBonusGame();
        OMY.Omy.add.tween(this.getChildByName("reels"), {alpha: 1}, this._gdConf["time_hide_reel"], null);
    }

    //-------------------------------------------------------------------------
    //endregion

    // region FREE GAME
    //-------------------------------------------------------------------------

    startFreeGame() {
        super.startFreeGame();

        // OMY.Omy.sound.stop(GameConstStatic.S_game_bg);
        // OMY.Omy.sound.stop(GameConstStatic.S_bg_fg);
        // GameConstStatic.S_game_bg = GameConstStatic.S_bg_fg;
    }

    _continueStartFree() {
        AppG.emit.emit(AppConst.EMIT_FREE_GAME_BEGIN);
        if (AppG.serverWork.haveFreeOnStart) {
            this._showFreeWindow();
        } else {
            OMY.Omy.add.tween(
                this._reelBlock,
                {
                    alpha: this._gdConf["no_win_alpha"],
                },
                this._gdConf["timer_hide_reels"]
            );
            OMY.Omy.add.timer(this._gdConf["timer_start_free"], this._showFreeWindow, this);
        }
        if (AppG.totalFreeGame > 3) {
            OMY.Omy.sound.play(GameConstStatic.S_fg_start);
            OMY.Omy.add.timer(3.5, this._soundFreeStartPlay, this);
        } else {
            OMY.Omy.sound.play(GameConstStatic.S_fg_start2);
            OMY.Omy.add.timer(2.0, this._soundFreeStartPlay, this);
        }
    }

    /**     * @private     */
    _soundFreeStartPlay() {
        OMY.Omy.sound.play(GameConstStatic.S_fg_sound);
    }

    /**     * @private     */
    _showFreeWindow() {
        if (this._reelBlock.alpha !== 1)
            OMY.Omy.add.tween(
                this._reelBlock,
                {
                    alpha: 1,
                },
                0.1
            );
        AppG.state.startNewSession();
    }

    finishFreeGame() {
        OMY.Omy.info("view. finish free game");
        AppG.autoGameRules.bonusGameOff();
        if (AppG.autoGameRules.isAutoPause) {
            AppG.autoGameRules.continueAutoGame();
        }
        AppG.autoStart = false;
        AppG.isFreeGame = false;
        OMY.Omy.navigateBtn.updateState(AppConst.C_END_FREE_GAME);
        this._continueEndFree();
    }

    _continueEndFree() {
        AppG.emit.emit(AppConst.EMIT_FREE_GAME_END);
        AppG.isEndFree = false;
        AppG.state.startNewSession();
        OMY.Omy.sound.stop(GameConstStatic.S_fg_sound);
        OMY.Omy.sound.play(GameConstStatic.S_fg_end);
    }

    freeInFree() {
        /*this._reelBlock.updateToState(AppConst.SLOT_SYMBOL_NO_WIN);
        this._activeList.map((a, index, array) => a.map((b, index, array) => b.scatterFree(true)));
        OMY.Omy.add.timer(this._gdConf["timer_start_free"], this._showFreeInFreeWindow, this);*/
    }

    /*/!**     * @private     *!/
    _showFreeInFreeWindow() {
        this._freeInFreeMess.visible = true;
        this._freeInFreeMess.alignContainer();
        this._freeInFreeMess.alpha = 0;
        this._freeInFreeMess.scale.set(0);
        OMY.Omy.sound.play(GameConstStatic.S_fg_in_free);
        this._freeInFreeMess.setXY(this._freeInFreeMess.json.x, this._freeInFreeMess.json.y);
        OMY.Omy.add.tween(this._freeInFreeMess, {
            scaleX: 1, scaleY: 1, alpha: 1, ease: this._freeInFreeMess.json["ease_show"],
        }, this._freeInFreeMess.json["tween_show"], this._inFreeDelay.bind(this));
    }

    /!**     * @private     *!/
    _inFreeDelay() {
        OMY.Omy.add.timer(this._freeInFreeMess.json["delay_screen"], this._hideInFreeMess, this);
    }

    /!**     * @private     *!/
    _hideInFreeMess() {
        const hidePos = this._freeInFreeMess.json["tween_hide_pos"];
        OMY.Omy.add.tween(this._freeInFreeMess, {
            scaleX: 0, scaleY: 0, alpha: 0, ease: this._freeInFreeMess.json["ease_hide"],
            x: hidePos.x, y: hidePos.y,
        }, this._freeInFreeMess.json["tween_hide"], this._onInFreeMessHide.bind(this));
    }

    /!**     * @private     *!/
    _onInFreeMessHide() {
        this._reelBlock.updateToState(AppConst.SLOT_SYMBOL_NONE);
        AppG.serverWork.updateTotalFreeGame();
        AppG.state.gameOver();
    }*/

    //-------------------------------------------------------------------------
    //endregion

    // region Re-Spin:
    //-------------------------------------------------------------------------

    startRespinGame(onStart = false) {
        super.startRespinGame(onStart);
        return false;
    }

    nextRespinGame() {
        super.nextRespinGame();
    }

    finishRespinGame(onWin = false) {
        super.finishRespinGame();
        return false;
    }

    //-------------------------------------------------------------------------
    //endregion

    // region win on lines:
    //-------------------------------------------------------------------------
    showWinCombo() {
        this._winOnlyScatter = this._dataWin.oneWinSymbol && this._dataWin.hasScatterWin;
        if (this._winOnlyScatter || AppG.isSuperTurbo) OMY.Omy.sound.play(GameConstStatic.S_end_show_win);
        else OMY.Omy.sound.play(GameConstStatic.S_show_win_3);
        /*switch (this._dataWin.maxCountSymbol) {
            case 5: {
                OMY.Omy.sound.play(GameConstStatic.S_show_win_5);
                break;
            }
            case 4: {
                OMY.Omy.sound.play(GameConstStatic.S_show_win_4);
                break;
            }

            default: {
                OMY.Omy.sound.play(GameConstStatic.S_show_win_3);
                break;
            }
        }*/
        if (AppG.isSuperTurbo) {
            this._showWinTurbo();
            return;
        }

        OMY.Omy.info("view. show win combo");
        AppG.emit.emit(AppConst.EMIT_WIN);
        this._playWinAnimation = true;
        this._isShowingWinLines = true;
        this._isAnimationsSkiped = false;
        this._playLoopAnimations = false;
        this._allLineOnScreen = false;
        this._configShowLine();

        if (!this._incWinByLine) {
            this._calcAutoRulesWin(AppG.serverWork.spinWin);
            this._calcAllSpinWin(AppG.serverWork.spinWin);
        }
        this._calcWinTime();
        OMY.Omy.navigateBtn.updateState(AppConst.C_WIN);
        this._checkWinMessageEffect();
        this._showAllWinLines();
        this._showOneLineWinAnimations();
        // this._playWinBgAnim = true;
        if (AppG.winCoef >= 50) {
            // this._bgWinPart = OMY.Omy.add.neutrinoParticlesJson(this._reelsCanvas, this._gdConf["reel_big_win_p"]);
        } else if (AppG.winCoef < 50 && AppG.winCoef >= 30) {
            // this._bgSpine.gotoAndPlay(0, true, this._bgSpine.json["a_list"][2]);
            // OMY.Omy.add.tween(this._aReelDown, {alpha: 1}, 0.1);
            // this._aReelDown.gotoAndPlay(0, true, this._aReelDown.json["a_list"][2]);
            // OMY.Omy.add.tween(this._aReelTop, {alpha: 1}, 0.1);
            // this._aReelTop.gotoAndPlay(0, false);
        } else if (AppG.winCoef < 30 && AppG.winCoef >= 5) {
            // this._bgSpine.gotoAndPlay(0, true, this._bgSpine.json["a_list"][1]);
            // OMY.Omy.add.tween(this._aReelDown, {alpha: 1}, 0.1);
            // this._aReelDown.gotoAndPlay(0, true, this._aReelDown.json["a_list"][1]);
        } else if (AppG.winCoef < 5) {
            // this._bgSpine.gotoAndPlay(0, true, this._bgSpine.json["a_list"][0]);
            // OMY.Omy.add.tween(this._aReelDown, {alpha: 1}, 0.1);
            // this._aReelDown.gotoAndPlay(0, true, this._aReelDown.json["a_list"][0]);
        }
        OMY.Omy.remove.tween(this._reelWinTint);
        OMY.Omy.add.tween(this._reelWinTint, {alpha: 1}, 0.2);
        AppG.emit.once(AppConst.APP_HIDE_MESSAGE_WIN, this._endShowWinLines, this);
    }

    _showAllWinLines() {
        OMY.Omy.info("view. start show all win line in one");
        this._dataWin.repeatWins();

        if (this._clearReelsOnWin) {
            // this._reelBlock.updateToState(AppConst.SLOT_SYMBOL_NO_WIN);
            this._resetArrayWinData();
        } else {
            this._resetArrayWinData(AppConst.SLOT_SYMBOL_NONE);
        }
        while (!this._dataWin.endLines) {
            this._dataWin.nextLine();

            let allowArray = this.findWinSymbols(this._dataWin, false, false, this._showOnWinNoWinSymbols);
            this._winEffect.showWinSymbol(
                allowArray,
                this._isAnimationsSkiped && !this._dataWin.isBonusWin && !this._dataWin.isScatter
            );
            for (let i = 0; i < allowArray.length; i++) {
                let index = AppG.convertID(allowArray[i].reelId, allowArray[i].symbolId);
                if (
                    this._arrayWinData[index].type !== AppConst.SLOT_SYMBOL_WIN &&
                    allowArray[i].type === AppConst.SLOT_SYMBOL_WIN
                ) {
                    AppG.setWinSymbolD(this._arrayWinData[index]);
                    this._arrayWinData[index] = allowArray[i];
                }
            }
            // this._reelBlock.updateWinState(allowArray);
            this._animateWinLine();
        }
        this._reelBlock.updateWinState(this._arrayWinData);

        this._dataWin.repeatWins();
    }

    _showAllWinLinesTurbo() {
        OMY.Omy.info("view. start show all win line turbo");
        this._dataWin.repeatWins();
        this._winEffect.show();

        this._resetArrayWinData();
        while (!this._dataWin.endLines) {
            this._dataWin.nextLine();
            // if (this._dataWin.winSymbol === "@") this._santaMulti.winCombo(this._dataWin.countSymbol);

            let allowArray = this.findWinSymbols(this._dataWin, false, false, this._showOnWinNoWinSymbols);
            this._winEffect.showWinSymbol(
                allowArray,
                this._isAnimationsSkiped && !this._dataWin.isBonusWin && !this._dataWin.isScatter
            );
            for (let i = 0; i < allowArray.length; i++) {
                let index = AppG.convertID(allowArray[i].reelId, allowArray[i].symbolId);
                if (
                    this._arrayWinData[index].type !== AppConst.SLOT_SYMBOL_WIN &&
                    allowArray[i].type === AppConst.SLOT_SYMBOL_WIN
                ) {
                    AppG.setWinSymbolD(this._arrayWinData[index]);
                    this._arrayWinData[index] = allowArray[i];
                }
            }
            if (this._dataWin.isScatter) this._lineInGame.showWinLineScatter();
            else this._lineInGame.showWinLine(this._dataWin.line, this._clearLinesOnWin, !this._dataWin.isScatter);
            this._animateWinLine();
        }
        this._reelBlock.updateWinState(this._arrayWinData);

        this._dataWin.repeatWins();
    }

    _checkWinMessageEffect() {
        super._checkWinMessageEffect();
    }

    _checkWinMessageTurbo() {
        OMY.Omy.info("view. win coef in turbo:", AppG.winCoef);
        if (AppG.winCoef >= AppG.gameConst.getData("super_win_rate") && this._gameHaveBigMess) {
            AppG.emit.emit(AppConst.APP_SHOW_SUPER_MEGA_WIN_TURBO, AppG.winCredit);
        } else if (AppG.winCoef >= AppG.gameConst.getData("mega_win_rate") && this._gameHaveBigMess) {
            AppG.emit.emit(AppConst.APP_SHOW_MEGA_WIN_TURBO, AppG.winCredit);
        } else if (AppG.winCoef >= AppG.gameConst.getData("epic_win_rate") && this._gameHaveBigMess) {
            AppG.emit.emit(AppConst.APP_SHOW_EPIC_WIN_TURBO, AppG.winCredit);
        } else if (AppG.winCoef >= AppG.gameConst.getData("big_win_rate") && this._gameHaveBigMess) {
            AppG.emit.emit(AppConst.APP_SHOW_BIG_WIN_TURBO, AppG.winCredit);
        } else {
            AppG.emit.emit(AppConst.APP_SHOW_MESSAGE_WIN_TURBO, AppG.winCredit);
        }
    }

    _calcWinTime() {
        super._calcWinTime();
        /*let allLinesTime = 0;
        this._dataWin.repeatWins();
        while (!this._dataWin.endLines) {
            this._dataWin.nextLine();
            allLinesTime += this._settingNextLineTime();
        }

        this._dataWin.repeatWins();
        AppG.showWinTime = allLinesTime;*/
    }

    _showWinTurbo() {
        this._allLineOnScreen = false;
        super._showWinTurbo();
        OMY.Omy.remove.tween(this._reelWinTint);
        OMY.Omy.add.tween(this._reelWinTint, {alpha: 1}, 0.2);
    }

    /**     * @private     */
    _endShakeReels() {
        AppG.updateGameSize(this);
    }

    _animateLoopLine() {
        if (this._reelWinTint.alpha !== 1) {
            OMY.Omy.remove.tween(this._reelWinTint);
            OMY.Omy.add.tween(this._reelWinTint, {alpha: 1}, 0.2);
        }
        super._animateLoopLine();
        /*switch (this._dataWin.countSymbol) {
            case 5: {
                OMY.Omy.sound.play(GameConstStatic.S_win_5());
                break;
            }
            case 4: {
                OMY.Omy.sound.play(GameConstStatic.S_win_4());
                break;
            }

            default: {
                OMY.Omy.sound.play(GameConstStatic.S_win_3());
                break;
            }
        }*/
    }

    _configShowLine() {
        super._configShowLine();
    }

    _skipWinAnimations() {
        if (!this._isShowingWinLines) return;
        if (this._isAnimationsSkiped) return;
        OMY.Omy.info("view. skip win");
        this._isAnimationsSkiped = true;
        this._lineTimer?.destroy();
        this._showingWinTimer?.destroy();
        if (!this._allLineOnScreen) {
            OMY.Omy.sound.stop(GameConstStatic.S_show_win_3);
            !this._winOnlyScatter && OMY.Omy.sound.play(GameConstStatic.S_end_show_win);
            this._allLineOnScreen = true;
            while (!this._dataWin.endLines) {
                this._dataWin.nextLine();
                if (this._dataWin.isScatter) this._lineInGame.showWinLineScatter();
                else this._lineInGame.showWinLine(this._dataWin.line, this._clearLinesOnWin, !this._dataWin.isScatter);
            }
        }
    }

    _calcAllSpinWin(winValue) {
        super._calcAllSpinWin(winValue);
        /*if (AppG.winCoef >= AppG.gameConst.getData("big_win_rate")) {
            AppG.getTimeByWinValue(AppG.winCredit, AppG.gameConst.getData("gui_big_win_inc_conf"), true);
        }*/
    }

    _endShowWinLines() {
        if (!this._allLineOnScreen) {
            OMY.Omy.sound.stop(GameConstStatic.S_show_win_3);
            !this._winOnlyScatter && OMY.Omy.sound.play(GameConstStatic.S_end_show_win);
            this._allLineOnScreen = true;
            while (!this._dataWin.endLines) {
                this._dataWin.nextLine();
                if (this._dataWin.isScatter) this._lineInGame.showWinLineScatter();
                else this._lineInGame.showWinLine(this._dataWin.line, this._clearLinesOnWin, !this._dataWin.isScatter);
            }
        }
        this._lineTimer?.destroy();
        // this._playWinBgAnim && this._bgSpine.play(false);
        // this._aReelDown.playing && this._aReelDown.play(false);
        super._endShowWinLines();
    }

    _settingNextLineTime() {
        // if (AppG.isAutoGame) {
        //     return AppG.incTimeTake / this._dataWin.countLinesWin;
        // } else {
        return super._settingNextLineTime();
        // }
    }

    _showWinLine() {
        OMY.Omy.info("view. show line. end show:", this._dataWin.endLines);
        if (this._dataWin.endLines) {
            OMY.Omy.sound.stop(GameConstStatic.S_show_win_3);
            !this._winOnlyScatter && OMY.Omy.sound.play(GameConstStatic.S_end_show_win);
            this._allLineOnScreen = true;
            return;
        }

        this._dataWin.nextLine();
        if (this._dataWin.isScatter) this._lineInGame.showWinLineScatter();
        else this._lineInGame.showWinLine(this._dataWin.line, this._clearLinesOnWin, !this._dataWin.isScatter);
        this._lineTimer = OMY.Omy.add.timer(this._settingNextLineTime(), this._showWinLine, this);
    }

    /**     * @private     */
    _checkEndShowLines() {
        /*if (WinMessage.incAnim) {
            return;
        }*/
        this._dataWin.repeatWins();
        this._lineInGame.hideWinEffect();
        this._winEffect.hide();
        this._winEffect.show();

        if (this._clearReelsOnWin) {
            // this._reelBlock.updateToState(AppConst.SLOT_SYMBOL_NO_WIN);
            this._resetArrayWinData();
        } else {
            this._resetArrayWinData(AppConst.SLOT_SYMBOL_NONE);
        }
        while (!this._dataWin.endLines) {
            this._dataWin.nextLine();

            let allowArray = this.findWinSymbols(this._dataWin, false, false, this._showOnWinNoWinSymbols);
            this._winEffect.showWinSymbol(
                allowArray,
                this._isAnimationsSkiped && !this._dataWin.isBonusWin && !this._dataWin.isScatter,
                true
            );
            for (let i = 0; i < allowArray.length; i++) {
                let index = AppG.convertID(allowArray[i].reelId, allowArray[i].symbolId);
                if (
                    this._arrayWinData[index].type !== AppConst.SLOT_SYMBOL_WIN &&
                    allowArray[i].type === AppConst.SLOT_SYMBOL_WIN
                ) {
                    AppG.setWinSymbolD(this._arrayWinData[index]);
                    this._arrayWinData[index] = allowArray[i];
                }
            }
            /*if (this._dataWin.isScatter)
                this._lineInGame.showWinLineScatter();
            else
                this._lineInGame.showWinLine(this._dataWin.line, this._clearLinesOnWin, !this._dataWin.isScatter);

            this._animateWinLine();*/
        }
        this._reelBlock.updateWinState(this._arrayWinData);
    }

    startLoopAnimation() {
        if (OMY.Omy.navigateBtn.state === AppConst.C_PLAY) return;
        if ((AppG.isAutoGame && !AppG.isEndRespin) || AppG.isFreeGame || AppG.beginBonusGame || AppG.isBonusGame)
            return;
        if (AppG.isEndRespin) this.finishRespinGame(true);

        this._lineTimer?.destroy();
        if (this._gdConf["wait_delay_loop"]) {
            OMY.Omy.remove.tween(this._reelWinTint);
            OMY.Omy.add.tween(this._reelWinTint, {alpha: 0}, 0.2);
            this._lineInGame.hideWinEffect();
            this._winEffect.hide();
            this._reelBlock.updateToState(AppConst.SLOT_SYMBOL_NONE);
            this._delayLoopTimer = OMY.Omy.add.timer(this._gdConf["wait_delay_loop"], this._onWaitDelayLoop, this);
        } else {
            super.startLoopAnimation();
        }
        /*if (this._dataWin.countLinesWin !== 1) {
            if (!this._playLoopAnimations) {
                super.startLoopAnimation();
            } else {
                if (this._gdConf["wait_delay_loop"]) {
                    this._lineInGame.hideWinEffect();
                    this._winEffect.hide();
                    this._reelBlock.updateToState(AppConst.SLOT_SYMBOL_NONE);
                    this._delayLoopTimer = OMY.Omy.add.timer(this._gdConf["wait_delay_loop"], this._onWaitDelayLoop, this);
                } else {
                    super.startLoopAnimation();
                }
            }
        } else {
            if (!this._playLoopAnimations)
                super.startLoopAnimation();
        }*/
    }

    findWinSymbols(dataWin, playSound = true, dispatch = true, noWin = false) {
        dispatch = this._playLoopAnimations;
        return super.findWinSymbols(dataWin, playSound, dispatch, noWin);
    }

    hideWin() {
        this._delayLoopTimer?.destroy();
        OMY.Omy.remove.tween(this._reelWinTint);
        OMY.Omy.add.tween(this._reelWinTint, {alpha: 0}, 0.2);
        const doHideWin = super.hideWin();
        doHideWin && this._stopAndHideBgSpine();
        return doHideWin;
    }

    //-------------------------------------------------------------------------
    //endregion

    /**     * @private     */
    _onWaitDelayLoop() {
        this._delayLoopTimer = null;
        super.startLoopAnimation();
    }

    /**     * @private     */
    _cleanWinEffect() {}

    // region work with windows:
    //-------------------------------------------------------------------------
    _onPayWindowOpen() {
        super._onPayWindowOpen();
        // this.getChildByName("reels").getChildByName("reel_canvas").alpha = 0;
        // this.getChildByName("reels").alpha = 0;
        // this.getChildByName("c_numbers").alpha = 0;
        // this.getChildByName("c_lines").alpha = 0;
        // this.getChildByName("c_logo").alpha = 0;
    }

    _onPayWindowClose() {
        super._onPayWindowClose();
        // this.getChildByName("reels").getChildByName("reel_canvas").alpha = 1;
        // this.getChildByName("reels").alpha = 1;
        // this.getChildByName("c_numbers").alpha = 1;
        // this.getChildByName("c_lines").alpha = 1;
        // this.getChildByName("c_logo").alpha = 1;
    }

    _onIntroWindowClose() {
        // OMY.Omy.add.tween(this._introTint, {alpha: 0}, 1, (graphic) => {
        //         graphic.destroy();
        //     },
        //     {
        //         onCompleteParams: [this._introTint]
        //     });
        // this._introTint = null;
        if (!AppG.beginFreeGame && !AppG.isFreeGame) {
            GameConstStatic.S_game_bg = GameConstStatic.S_bg;
            if (!OMY.Omy.sound.isSoundPlay(GameConstStatic.S_game_bg)) {
                OMY.Omy.sound.stop(GameConstStatic.S_game_bg);
                OMY.Omy.sound.play(GameConstStatic.S_game_bg, true);
            }
        }

        OMY.Omy.sound.pauseAll();
        OMY.Omy.sound.resumeAll();
        this._logo.continueIntroAnim();
        super._onIntroWindowClose();
        AppG.state.startNewSession();
    }

    _onIntroInfoClose() {
        super._onIntroInfoClose();
        if (AppG.gameConst.gameHaveIntro) {
            this._startIntro();

            this._logo.startIntroAnim();
        } else {
            if (!AppG.beginFreeGame && !AppG.isFreeGame) {
                GameConstStatic.S_game_bg = GameConstStatic.S_bg;
                // if (!OMY.Omy.sound.isSoundPlay(GameConstStatic.S_game_bg))
                //     OMY.Omy.sound.play(GameConstStatic.S_game_bg, true);
            }

            OMY.Omy.sound.pauseAll();
            OMY.Omy.sound.resumeAll();
        }
    }

    //-------------------------------------------------------------------------
    //endregion

    /**     * @private     */
    _onHideBigWin() {
        if (this._bgWinPart) {
            this._bgWinPart.destroy();
            this._bgWinPart = null;
        }
    }

    /**     * @private     */
    _onUpdateBtnState(btnState) {
        switch (btnState) {
            case AppConst.C_COLLECT: {
                if (!OMY.Omy.sound.isSoundPlay(GameConstStatic.S_gamble_wait))
                    OMY.Omy.sound.play(GameConstStatic.S_gamble_wait, true);
                break;
            }
        }
    }

    get activeWaitReelIndex() {
        return this._activeWaitReelIndex;
    }
}
