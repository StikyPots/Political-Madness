import {RGB, RGBA} from "love.math";

export type Rgba = [number, number, number, number];

export function rgbaColor(r: number, g: number, b: number, a?: number): LuaMultiReturn<RGBA> {
    return love.math.colorFromBytes(r, g, b, a);
}
