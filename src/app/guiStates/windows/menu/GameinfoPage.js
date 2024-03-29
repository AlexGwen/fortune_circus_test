import {GameinfoPageBase} from "../../../../casino/gui/windows/menu/GameinfoPageBase";
import {AppG} from "../../../../casino/AppG";

export class GameinfoPage extends GameinfoPageBase {
    constructor(source) {
        super(source);
        // this._renderLines(source.getChildByName("c_page_content")
        //     .getChildByName("c_lines").getChildByName("c_lines_render_land1"));
        // this._renderLines(source.getChildByName("c_page_content")
        //     .getChildByName("c_lines").getChildByName("c_lines_render_land2"));
        this._renderLines(source.getChildByName("c_page_content")
            .getChildByName("c_lines").getChildByName("c_lines_render_port1"));
        this._renderLines(source.getChildByName("c_page_content")
            .getChildByName("c_lines").getChildByName("c_lines_render_port2"));
    }

    _onCheckGraphic() {
        super._onCheckGraphic();
        this._spriteLocList = [];

        if (this._spriteLocList.length) {
            OMY.Omy.loc.addUpdate(this._onLocChange, this);
            this._onLocChange();
        }
    }

    /**     * @private     */
    _onLocChange() {
        for (let i = 0; i < this._spriteLocList.length; i++) {
            let sprite = this._spriteLocList[i];
            for (let key in sprite.json["loc"]) {
                if (OMY.OMath.inArray(sprite.json["loc"][key], AppG.language)) {
                    sprite.texture = key;
                    break;
                }
            }
        }
    }

    //-------------------------------------------------------------------------
    // PUBLIC
    //-------------------------------------------------------------------------

    destroy() {
        if (this._spriteLocList.length) {
            OMY.Omy.loc.removeUpdate(this._onLocChange, this);
        }
        this._spriteLocList.length = 0;
        this._spriteLocList = null;
        super.destroy();
    }

    //-------------------------------------------------------------------------
    // ACCESSOR
    //-------------------------------------------------------------------------
}
