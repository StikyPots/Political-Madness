import {GuiObject} from "./GuiObject";
import {rgbaColor} from "../Utils/Functions";
import {COLOR, TextAlignment} from "../Utils/Constantes";
import {AlignMode, Font, newFont} from "love.graphics";
import {RGBA} from "love.math";

import {Vector2} from "./Vector2";

export class TextGuiObject extends GuiObject {

    public absolutePosition: Vector2;
    public position: Vector2;
    public size: Vector2;
    public textColor: LuaMultiReturn<RGBA> = rgbaColor(...COLOR.BLACK);
    public textVisible: boolean = true;
    public alignMode: AlignMode = "center";
    public parent: GuiObject;

    public text: string;
    private font: Font;
    private textSize : number = 16;

    constructor(text: string, parent: GuiObject) {
        super();


        this.absolutePosition = parent.position;
        this.position = parent.position;
        this.size = parent.size;

        this.text = text;
        this.parent = parent as GuiObject;
        this.font = newFont(this.textSize)
    }

    public get getTextSize() {
        return this.textSize;
    }

    public set setTextSize(value: number) {
        this.textSize = value;
        this.font = newFont(value)
    }

    public setFont(font: Font) {
        this.font = font;
    }

    public update(dt: number) {
    }

    public draw() {

        love.graphics.push('transform');
        love.graphics.translate(this.parent.absolutePosition.x, this.parent.absolutePosition.y);
        love.graphics.setFont(this.font);

        love.graphics.printf(
            [
                this.textColor,
                this.text,
            ],
            this.position.x,
            this.position.y,
            100,
            this.alignMode
        )

    }
}