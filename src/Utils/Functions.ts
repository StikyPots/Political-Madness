import {RGBA} from "love.math";
import {AssetPath} from "../Types/res";
import {Vector2} from "../Classes/Vector2";
import {Scheduler} from "../Classes/Scheduler";
import {print} from "love.graphics";

export type Rgba = [number, number, number, number];

export function rgbaColor(r: number, g: number, b: number, a?: number): LuaMultiReturn<RGBA> {
    return love.math.colorFromBytes(r, g, b, a);
}


export function warn(...args: any[]): void {
    const yellow = "\x1b[33m"
    const reset = "\x1b[0m"

    for (const msg of args) {
        io.stdout.write(yellow+msg+reset);
    }
}


export function successPrint(...args: any[]): void {
    const yellow = "\x1b[32m"
    const reset = "\x1b[0m"

    for (const msg of args) {
        io.stdout.write(yellow+msg+reset);
    }
}

//no exit error
export function error(...args: any[]): void {
    const yellow = "\x1b[31m"
    const reset = "\x1b[0m"

    for (const msg of args) {
        io.stdout.write(yellow+msg+reset+"\n");
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


export function printTable(obj: any, indent: number = 0): string {
    const spacing = "  ".repeat(indent);

    if (obj === null) return "nil";
    if (typeof obj === "number" || typeof obj === "boolean") return obj.toString();
    if (typeof obj === "string") return `"${obj}"`;

    if (Array.isArray(obj)) {
        const items = obj.map(item => printTable(item, indent + 1));
        return `{ ${items.join(", ")} }`;
    }

    if (typeof obj === "function") {
        const info = debug.getinfo(obj);
        const name = info.name ?? "<anonymous>"

        return `<function ${name}>`
    }

    if (typeof obj === "object") {
        const entries = Object.entries(obj).map(([key, value]) => {
            return `${spacing}  ${key} = ${printTable(value, indent + 1)}`;
        });
        return `{\n${entries.join(",\n")}\n${spacing}}`;
    }


    return "nil"; // fallback
}


export function xorEncrypt(str: string, key: string): string {
    const res: string[] = [];

    for (let i = 0; i < str.length; i++) {
        const k = string.byte(key, (i % key.length) + 1);
        const c = string.byte(str, i + 1);
        res.push(string.char(c ^ k));
    }

    return res.join("");
}

export function toBase64(input: string): string {
    return love.data.encode("string", "base64", input)
}

export function fromBase64(input: string): string {
    return love.data.decode("string", "base64", input)
}

export namespace mouse {
    export function getMousePosition(): Vector2 {
        return new Vector2(love.mouse.getX(), love.mouse.getY())
    }
}