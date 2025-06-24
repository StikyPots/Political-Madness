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

export type ErrorMessage = keyof typeof ERROR_MESSAGE

export const ERROR_MESSAGE = {
    filenameNotFound: ""
}