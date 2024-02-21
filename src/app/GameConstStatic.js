export const GameConstStatic = {
    GAME_WIDTH: 1280,
    GAME_HEIGHT: 720,

    DESK_WIDTH: 1280,
    DESK_HEIGHT: 720,

    MOB_WIDTH: 1280,
    MOB_HEIGHT: 720,
    MOB_WIDTH_V: 540,
    MOB_HEIGHT_V: 960,

    SYMBOL_ON_REEL: "symbol_on_reel",
    CHECK_IDL_SYMB_EFFECT: "CHECK_IDL_SYMB_EFFECT",
    REMOVE_IDLE_SYMB_EFFECT: "remove_idle_symb_effect",
    S_btn_any: "btn_any",
    S_button_menu: "btn_any",
    S_btn_bet_minus: "btn_any",
    S_btn_bet_plus: "btn_any",
    S_take_take: "take-take",
    S_take_end: "",
    S_btn_bet_max: "btn_any",
    S_btn_reveal: "btn_start",
    S_btn_disable: "btn_any",
    S_btn_auto_off: "btn_any",
    S_btn_auto_on: "btn_any",
    S_btn_over_on: "btn_over",

    S_leaf_information: "leaf_information",

    S_reel_bg: "reelSpin",
    S_reel_stop: "reel_stop",
    S_reel_stop_all: "reel_stop",
    S_quickStop: "quickStop",

    S_win_3: () => {
        return "win_1"/* + String(OMY.OMath.randomRangeInt(1, 3))*/;
    },
    S_win_4: () => {
        return "win_2"/* + String(OMY.OMath.randomRangeInt(1, 2))*/;
    },
    S_win_5: () => {
        return "win_3"/* + String(OMY.OMath.randomRangeInt(1, 2))*/;
    },

    S_game_bg: "",
    S_bg: "main_diamond_blitz_down",
    S_bg_rs: "",
    S_bg_fg: "",
    S_fg_end: "",
    S_fg_start: "",
    S_fg_in_free: "",
    S_intro: "",
    S_bg_win: "",

    S_wheel_bg: "",
    S_bg_bonus: "",
    S_bonus_end: "",
    S_bonus_pick: "",

    S_intro_ambience: "intro_open_2",
    S_intro_start_logo_anim: "intro_open_1",
    S_intro_end_logo_anim: "",
    S_play_logo_show: "intro_2",

    S_paytable_open: "btn paytable open",
    S_help_close: "btn paytable close",

    S_wild_drop: "wild passing on reels",
    S_wild_drop1: "wild drop1",
    S_wild_drop2: "wild drop2",
    S_wild_drop3: "wild drop3",
    S_wild_wait: "",
    S_fly_coins: "",

    S_gamble_wait: "",
    S_gamble_choice: "",
    S_gamble_tick: "",
    S_gamble_win: "",
    S_gamble_lose: "",
    S_gamble_super_win: "",

    S_JPWin: "JPWin",

    S_reel_scatter1: "",
    S_reel_scatter2: "",
    S_reel_scatter3: "",
    S_reel_scatter4: "",
    S_reel_scatter5: "",
    S_scatter_wait: "",

    S_big_win: "big_win",
    S_show_win_3: "show win line",
    S_show_win_4: "",
    S_show_win_5: "",
    S_end_show_win: "win_line_all",
    S_cash: "win2balance",
    S_big_win_END: "big win_ END",

    WIN_MESSAGE_SHOW: "WIN_MESSAGE_SHOW",
    WIN_MESSAGE_HIDE: "WIN_MESSAGE_HIDE",
    WIN_MESSAGE_BIG: "WIN_MESSAGE_BIG",

    E_WILD_ON_SCREEN: "E_WILD_ON_SCREEN",
};
