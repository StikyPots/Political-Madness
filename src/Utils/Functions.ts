import {RGBA} from "love.math";
import {AssetPath} from "../Interfaces/res";


export type Rgba = [number, number, number, number];

export function rgbaColor(r: number, g: number, b: number, a?: number): LuaMultiReturn<RGBA> {
    return love.math.colorFromBytes(r, g, b, a);
}


export function deepCopy<T>(obj: T): T {
    const seen = new Map<any, any>();

    function deepCopy(value: any): any {
        if (type(value) !== "table") {
            return value;
        }

        if (seen.has(value)) {
            return seen.get(value);
        }

        const copy: any = {};
        seen.set(value, copy);

        //downlevelIteration
        for (const [k, v] of pairs(value)) {
            copy[k] = deepCopy(v);
        }

        // Copy metatable if exists
        const mt = getmetatable(value);
        if (mt !== undefined) {
            setmetatable(copy, mt);
        }

        return copy;
    }

    return deepCopy(obj)
}

export function getResource(path: AssetPath): string {
    return path
}
