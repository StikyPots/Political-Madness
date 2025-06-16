import {Rgba} from "./Functions";

export const COLOR = {
    WHITE: [255,255,255] as [number,number,number],
    BLACK: [1,1,1] as [number,number,number],
}

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


export const ErrMessage: string[] = [
    "invalid ImageId: "
]