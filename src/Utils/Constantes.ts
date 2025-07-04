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



