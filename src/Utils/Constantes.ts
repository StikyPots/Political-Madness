import {ServiceRegistry} from "../Services/Utils/ServiceRegistry";

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];

export const COLOR = {
    WHITE: [255, 255, 255] as RGB,
    BLACK: [0, 0, 0] as RGB,
    RED:   [255, 0, 0] as RGB,
    GREEN: [0, 255, 0] as RGB,
    BLUE:  [0, 0, 255] as RGB,
    GRAY:  [255/2, 255/2, 255/2] as RGB,
    TRANSPARENT: [0, 0, 0, 0] as RGBA
};


export enum MouseButton {
    LeftMouseButton = 1,
    RightMouseButton = 2,
    MiddleMouseButton = 3,
}

export enum GameState {
    Menu,
    Game,
    Card,
    Setting
}

export enum TextAlignment {
    Center,
    Right,
    Left
}

export enum HorizontalTextAlignment {
    Center,
    Top,
    Bottom
}

export const SAVE_FILE_FORMAT = ".dat"
export const ENCRYPTION_KEY = "g7s8JfQpA4tVx9bL"

export const DATASTORE_NAMES = {
    PLAYER_DATA: "PLAYER_DATA",
    SETTING: "SETTING_CONFIG"
}

export const GAME_VERSION = "0.0.1-alpha"

export const HAND_CURSOR = love.mouse.getSystemCursor("hand")
export const ARROW_CURSOR = love.mouse.getSystemCursor("arrow")
export const KEYS_CODE = {
    ESCAPE:        "escape",
    SPACE:         "space",
    A:             "a",
    B:             "b",
    C:             "c",
    D:             "d",
    E:             "e",
    F:             "f",
    G:             "g",
    H:             "h",
    I:             "i",
    J:             "j",
    K:             "k",
    L:             "l",
    M:             "m",
    N:             "n",
    O:             "o",
    P:             "p",
    Q:             "q",
    R:             "r",
    S:             "s",
    T:             "t",
    U:             "u",
    V:             "v",
    W:             "w",
    X:             "x",
    Y:             "y",
    Z:             "z",

    // Number keys
    ZERO:          "0",
    ONE:           "1",
    TWO:           "2",
    THREE:         "3",
    FOUR:          "4",
    FIVE:          "5",
    SIX:           "6",
    SEVEN:         "7",
    EIGHT:         "8",
    NINE:          "9",

    // Symbol keys
    EXCLAMATION:   "!",
    DOUBLE_QUOTE:  "\"",
    HASH:          "#",
    DOLLAR:        "$",
    AMPERSAND:     "&",
    SINGLE_QUOTE:  "'",
    LEFT_PAREN:    "(",
    RIGHT_PAREN:   ")",
    ASTERISK:      "*",
    PLUS:          "+",
    COMMA:         ",",
    MINUS:         "-",
    PERIOD:        ".",
    SLASH:         "/",
    COLON:         ":",
    SEMICOLON:     ";",
    LESS_THAN:     "<",
    EQUAL:         "=",
    GREATER_THAN:  ">",
    QUESTION_MARK: "?",
    AT:            "@",
    LEFT_BRACKET:  "[",
    BACKSLASH:     "\\",
    RIGHT_BRACKET: "]",
    CARET:         "^",
    UNDERSCORE:    "_",
    BACKTICK:      "`",

    // Numpad keys
    KP0:           "kp0",
    KP1:           "kp1",
    KP2:           "kp2",
    KP3:           "kp3",
    KP4:           "kp4",
    KP5:           "kp5",
    KP6:           "kp6",
    KP7:           "kp7",
    KP8:           "kp8",
    KP9:           "kp9",
    KP_PERIOD:     "kp.",
    KP_COMMA:      "kp,",
    KP_DIVIDE:     "kp/",
    KP_MULTIPLY:   "kp*",
    KP_MINUS:      "kp-",
    KP_PLUS:       "kp+",
    KP_ENTER:      "kpenter",
    KP_EQUALS:     "kp=",

    // Navigation keys
    UP:            "up",
    DOWN:          "down",
    LEFT:          "left",
    RIGHT:         "right",
    HOME:          "home",
    END:           "end",
    PAGE_UP:       "pageup",
    PAGE_DOWN:     "pagedown",

    // Editing keys
    INSERT:        "insert",
    BACKSPACE:     "backspace",
    TAB:           "tab",
    CLEAR:         "clear",
    RETURN:        "return",
    DELETE:        "delete",

    // Function keys
    F1:            "f1",
    F2:            "f2",
    F3:            "f3",
    F4:            "f4",
    F5:            "f5",
    F6:            "f6",
    F7:            "f7",
    F8:            "f8",
    F9:            "f9",
    F10:           "f10",
    F11:           "f11",
    F12:           "f12",
    F13:           "f13",
    F14:           "f14",
    F15:           "f15",
    F16:           "f16",
    F17:           "f17",
    F18:           "f18",

    // Modifier keys
    NUMLOCK:       "numlock",
    CAPSLOCK:      "capslock",
    SCROLLLOCK:    "scrolllock",
    RSHIFT:        "rshift",
    LSHIFT:        "lshift",
    RCTRL:         "rctrl",
    LCTRL:         "lctrl",
    RALT:          "ralt",
    LALT:          "lalt",
    RGUI:          "rgui",
    LGUI:          "lgui",
    MODE:          "mode",

    // Application keys
    WWW:           "www",
    MAIL:          "mail",
    CALCULATOR:    "calculator",
    COMPUTER:      "computer",
    APP_SEARCH:    "appsearch",
    APP_HOME:      "apphome",
    APP_BACK:      "appback",
    APP_FORWARD:   "appforward",
    APP_REFRESH:   "apprefresh",
    APP_BOOKMARKS: "appbookmarks",

    // Miscellaneous keys
    PAUSE:         "pause",
    HELP:          "help",
    PRINTSCREEN:   "printscreen",
    SYSREQ:        "sysreq",
    MENU:          "menu",
    APPLICATION:   "application",
    POWER:         "power",
    CURRENCY_UNIT: "currencyunit",
    UNDO:          "undo",
} as const;




export type Keys =  typeof KEYS_CODE

export enum InputPriorityOrder {
    Low,
    Medium,
    Heavy
}


export const GAME_ENVIRONMENT = "development"


export function restart() {
    os.execute("love build")
}
