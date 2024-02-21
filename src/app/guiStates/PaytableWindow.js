import {PaytableWindowBase} from "../../casino/gui/windows/PaytableWindowBase";
import {PaytablePage} from "./windows/paytable/PaytablePage";

export class PaytableWindow extends PaytableWindowBase {
    constructor() {
        super();
        this._pageClass = PaytablePage;
    }

    _createGraphic() {
        if (this._isGraphic) return;
        super._createGraphic();
        /** @type {OMY.OSprite} */
        this._bg1 = this.getChildByName("s_help_bg3");
        this._tint = this.getChildByName("s_tint");
        this._updateGameSize();
    }

    _clearGraphic() {
        if (!this._isGraphic) return;
        this._tint = null;
        this._bg1 = null;
        this._bg2 = null;
        super._clearGraphic();
    }

    _updateGameSize() {
        if (!this.active) return;
        if (this._tint) {
            this._tint.x = -this.x;
            this._tint.y = -this.y;
            this._tint.width = OMY.Omy.WIDTH;
            this._tint.height = OMY.Omy.HEIGHT;
        }
        super._updateGameSize();

        if (this._bg1) {
            this._bg1.x = -this.x;
            this._bg1.y = -this.y;
            this._bg1.width = OMY.Omy.WIDTH;
            this._bg1.height = OMY.Omy.HEIGHT;
        }
    }

    revive(onComplete = null) {
        super.revive(onComplete);
    }

    _onRevive() {
        super._onRevive();
    }

    kill(onComplete = null) {
        super.kill(onComplete);
    }

    _onKill() {
        super._onKill();
    }
}
