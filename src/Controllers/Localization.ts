import {parser} from "../Utils/Parser";
import {deepCopy, printTable} from "../Utils/Functions";

export class Localization {
    private static current: string;
    private static langPath = "res/lang/"

    private static languageTable: object;

    public static setLocalization(lang: string = "en"): object {
        this.current = lang;

        const path = this.langPath + lang  + ".json";
        const [content, size] = love.filesystem.read(path);

        const langData: object = parser.parse(content);
        this.languageTable = deepCopy(langData);

        return langData as typeof langData
    }

    public static get(id: string) {

        if (this.languageTable[id] === undefined) {
            throw new Error(
                "this id is not found in language table: " +
                this.current +
                " id: " +
                id +
                "\n"
                + debug.traceback()
            )
        }

        return this.languageTable[id];
    }

    public static getCurrentLanguage() {
        return this.current;
    }
}