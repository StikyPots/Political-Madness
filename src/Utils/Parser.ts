import {print} from "love.graphics";
import {standardVisitors} from "typescript-to-lua/dist/transformation/visitors";

const isBooleanTrue = (value: string): boolean => value === "true";
const isBooleanFalse = (value: string): boolean => value === "false";
const isNull = (value: string): boolean => value === "null";
const isNumber = (value: string): boolean => !isNaN(Number(value));
const isDigit = (char: string): boolean =>
    char >= "0" && char <= "9";

function isAlphaNumeric(char: string): boolean {
    return (
        (char >= "a" && char <= "z") ||
        (char >= "A" && char <= "Z") ||
        (char >= "0" && char <= "9")
    );
}

const isWhitespace = (char: string) =>
    char === " " || char === "\n" || char === "\t" || char === "\r";


export type TokenType =
    | "BraceOpen"
    | "BraceClose"
    | "BracketOpen"
    | "BracketClose"
    | "String"
    | "Number"
    | "Comma"
    | "Colon"
    | "True"
    | "False"
    | "Null";




export interface Token {
    type: TokenType;
    value: string;
}

export type ASTNode =
    | { type: "Object"; value: { [key: string]: ASTNode } }
    | { type: "Array"; value: ASTNode[] }
    | { type: "String"; value: string }
    | { type: "Number"; value: number }
    | { type: "Boolean"; value: boolean }
    | { type: "Null" };


function tokeniser(input: string): Token[] {
    let current = 0;
    const tokens: Token[] = [];

    while (current < input.length) {
        let char = input[current];

        if (char === "{") {
            tokens.push({ type: "BraceOpen", value: char });
            current++;
            continue;
        }

        if (char === "}") {
            tokens.push({ type: "BraceClose", value: char });
            current++;
            continue;
        }

        if (char === "[") {
            tokens.push({ type: "BracketOpen", value: char });
            current++;
            continue;
        }
        if (char === "]") {
            tokens.push({ type: "BracketClose", value: char });
            current++;
            continue;
        }

        if (char === ":") {
            tokens.push({ type: "Colon", value: char });
            current++;
            continue;
        }

        if (char === ",") {
            tokens.push({ type: "Comma", value: char });
            current++;
            continue;
        }

        if (char === '"') {
            let value = "";
            char = input[++current];
            while (char !== '"') {
                value += char;
                char = input[++current];
            }
            current++;
            tokens.push({ type: "String", value });
            continue;
        }

        // For number, boolean and null values
        if (isAlphaNumeric(char)) {
            // if it's a number or a word character
            let value = "";
            while (isAlphaNumeric(char)) {
                value += char;
                char = input[++current];
            }

            if (isNumber(value)) tokens.push({ type: "Number", value });
            else if (isBooleanTrue(value)) tokens.push({ type: "True", value });
            else if (isBooleanFalse(value)) tokens.push({ type: "False", value });
            else if (isNull(value)) tokens.push({ type: "Null", value });
            else throw new Error("Unexpected value: " + value);

            continue;
        }

        // Skip whitespace
        if (isWhitespace(char)) {
            current++;
            continue;
        }

        throw new Error("Unexpected character: " + char);
    }

    return tokens;
}

function deserializeAST(ast: ASTNode): any {
    switch (ast.type) {
        case "Object":
            const obj: Record<string, any> = {};
            for (const key in ast.value) {
                obj[key] = deserializeAST(ast.value[key]);
            }
            return obj;

        case "Array":
            return ast.value.map(() => deserializeAST);

        case "String":
            return ast.value;

        case "Number":
            return ast.value;

        case "Boolean":
            return ast.value;

        case "Null":
            return null;

        default:
            throw new Error(`Unknown AST node type: ${(ast as ASTNode).type}`);
    }
}


export namespace parser {
    export function parse(JSONString: string): any {
        const tokens: Token[] = tokeniser(JSONString);

        if (!tokens.length) {
          throw new Error("Nothing to parse. Exiting!");
        }

        let current: number = 0;

        function advance(): Token {
            return tokens[++current]
        }

        function parseObject(): ASTNode {
            const node: ASTNode = {type: "Object", value: {}};
            let token = advance();

            while (token.type !== "BraceClose") {

                if (token.type === "String") {
                    const key = token.value;
                    token = advance();

                    if (token.type !== "Colon") throw new Error("Expected : in key-value pair");

                    token = advance();
                    node.value[key] = parseValue() as ASTNode;
                } else {
                    throw new Error(`Expected String key in object. Token type: ${token.type}`);
                }
                token = advance();
                if (token.type === "Comma") token = advance();
            }
            return node;
        }

        function parseArray() {
            const node: ASTNode = { type: "Array", value: [] };
            let token = advance();

            while (token.type !== "BracketClose") {
                const value = parseValue();
                node.value.push(value as ASTNode);

                token = advance();

                if (token.type === "Comma") token = advance();
            }

            return node;
        }

        function parseValue() {
            const token: Token = tokens[current];

            switch (token.type) {
                case "String":
                    return { type: "String", value: token.value };
                case "Number":
                    return {type: "Number", value: Number(token.value)};
                case "True":
                    return { type: "Boolean", value: true };
                case "False":
                    return { type: "Boolean", value: false };
                case "Null":
                    return {type: null};
                case "BraceOpen":
                    return parseObject();
                case "BracketOpen":
                    return parseArray();

                default:
                    throw new Error(`Unexpected token type: ${token.type}`);
            }
        }

        const AST = parseValue();

        return deserializeAST(AST as ASTNode);
    }

    type TypedValue =
        | { type: "object"; value: Record<string, TypedValue> }
        | { type: "array"; value: TypedValue[] }
        | { type: "string"; value: string }
        | { type: "number"; value: number }
        | { type: "boolean"; value: boolean }
        | { type: "null"; value: null };

    function escapeString(str: string): string {
        let escaped = "";
        for (let i = 0; i < str.length; i++) {
            const ch = str[i];
            if (ch === "\\") {
                escaped += "\\\\";
            } else if (ch === '"') {
                escaped += '\\"';
            } else if (ch === "\n") {
                escaped += "\\n";
            } else if (ch === "\r") {
                escaped += "\\r";
            } else if (ch === "\t") {
                escaped += "\\t";
            } else {
                escaped += ch;
            }
        }
        return escaped;
    }

    export function stringify(value: any): string {
        if (value === null) {
            return "null";
        }

        const type = typeof value;

        if (type === "number" || type === "boolean") {
            return String(value);
        }

        if (type === "string") {
            return `"${escapeString(value)}"`;
        }

        if (Array.isArray(value)) {
            return `[${value.map(() => stringify).join(",")}]`;
        }

        if (type === "object") {
            const entries = Object.entries(value).map(
                ([key, val]) => {
                    if (typeof key !== "string") {
                        throw new Error("Object keys must be strings");
                    }
                    return `"${escapeString(key)}":${stringify(val)}`;
                }
            );
            return `{${entries.join(",")}}`;
        }

        throw new Error("Unsupported data type");
    }

}