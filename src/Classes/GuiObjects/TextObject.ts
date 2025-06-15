import {GuiObject} from "../GuiObject";
import {Vector2} from "../Vector2";
import {TextGuiObject} from "../TextGuiObject";
import {AlignMode, Font, newFont} from "love.graphics";
import {RGBA} from "love.math";
import {rgbaColor} from "../../Utils/Functions";
import {COLOR} from "../../Utils/Constantes";

export class TextObject extends GuiObject {

    public absolutePosition: Vector2;
    public position: Vector2;
    public size: Vector2;

    public alignMode: AlignMode = "center";
    private font: Font;
    public text: string;
    public textColor: LuaMultiReturn<RGBA> = rgbaColor(...COLOR.BLACK);
    private textSize: number = 15;
    public textVisible: boolean = true;
    public parent: GuiObject | null = null;

    update(dt: number): void {
    }

    constructor(position: Vector2, size: Vector2, text: string) {
        super();

        this.position = position;
        this.size = size;
        this.absolutePosition = position;

        this.text = text;
        this.font = newFont(this.textSize)
    }




    setFont(font: Font): void {
    }

    set setTextSize(value: number) {
    }

}