import {ClickableGuiObject} from "../ClickableGuiObject";
import {Vector2} from "../Vector2";
import {TextGuiObject} from "../TextGuiObject";
import {HorizontalTextAlignment} from "../../Utils/Constantes";
import {AlignMode, Font} from "love.graphics";
import {RGBA} from "love.math";
import {TextObject} from "./TextObject";
import {Button} from "./Button";

export class TextButton extends ClickableGuiObject {

    protected _absolutePosition: Vector2;
    protected _position: Vector2;
    public size: Vector2;
    private text: string;

    private textObject: TextObject;


    constructor(text: string, position: Vector2, size: Vector2) {
        super();
        this._absolutePosition = position;
        this._position = position;
        this.size = size;
        this.text = text;

        this.textObject = new TextObject(text, new Vector2(), size);
        this.textObject.parent = this;
    }



    get horizontalAlignment(): number {
        return this.textObject.horizontalAlignment;
    }

    get textSize(): number {
        return this.textObject.textSize;
    }

    set textSize(value: number) {
        this.textObject.textSize = value;
    }

    set horizontalAlignment(value: HorizontalTextAlignment) {
       this.textObject.horizontalAlignment = value;
    }

    set textColor(value: LuaMultiReturn<RGBA>) {
        this.textObject.textColor = value;
    }

    get textColor(): LuaMultiReturn<RGBA> {
        return this.textObject.textColor;
    }

    set textVisible(value: boolean) {
        this.textObject.textVisible = value;
    }

    get textVisible(): boolean {
        return this.textObject.textVisible
    }

    get alignMode(): AlignMode {
        return this.textObject.alignMode;
    }

    set alignMode(value: AlignMode) {
        this.textObject.alignMode = value;
    }

    public override draw() {
        this.textObject.draw()
    }
}