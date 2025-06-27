import {RGBA} from "love.math";
import {AssetPath} from "../Interfaces/res";
import {colorize, ERROR_MESSAGE, ErrorMessage} from "./Constantes";

export type Rgba = [number, number, number, number];

export function rgbaColor(r: number, g: number, b: number, a?: number): LuaMultiReturn<RGBA> {
    return love.math.colorFromBytes(r, g, b, a);
}
export function error(err: ErrorMessage): void {

}
export function warn(...args: any[]): void {
    for (const msg of args) {

    }
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

export function getAsset(path: AssetPath): string {
    return path
}


export function requireAllStates(): void {
    const path = "Controllers/GUIStates/"
    const filesDir: string[] = love.filesystem.getDirectoryItems(path);

    for (const file of filesDir) {
      if (!file.endsWith(".lua")) {continue}

      const modulePath = "../" + path + file.substring(0, file.length - 4);
      require(modulePath);
    }
}

export function wait(n: number = 0) {
    let t0: number = os.clock()
    do {
        coroutine.yield()
    } while (os.clock() - t0 < n)
}