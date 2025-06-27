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

export const HAND_CURSOR = love.mouse.getSystemCursor("hand")
export const ARROW_CURSOR = love.mouse.getSystemCursor("arrow")


export const colorize = new (class {
    color = (code: number, ended = false, ...messages: any[]) =>
        `\x1b[${code}m${messages.join(" ")}${ended ? "\x1b[0m" : ""}`;
    black = this.color.bind(null, 30, false);
    red = this.color.bind(null, 31, false);
    green = this.color.bind(null, 32, false);
    yellow = this.color.bind(this, 33, true);
    blue = this.color.bind(this, 34, false);
    magenta = this.color.bind(this, 35, false);
    cyan = this.color.bind(this, 36, false);
    white = this.color.bind(this, 37, true);
    bgBlack = this.color.bind(this, 40, true);
    bgRed = this.color.bind(this, 41, true);
    bgGreen = this.color.bind(this, 42, true);
    bgYellow = this.color.bind(this, 43, true);
    bgBlue = this.color.bind(this, 44, true);
    bgMagenta = this.color.bind(this, 45, true);
    bgCyan = this.color.bind(this, 46, true);
    bgWhite = this.color.bind(this, 47, true);
})();


export type ErrorMessage = keyof typeof ERROR_MESSAGE

export const ERROR_MESSAGE = {
    filenameNotFound: ""
}