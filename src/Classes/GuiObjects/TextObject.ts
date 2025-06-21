import {TextGuiObject} from "../TextGuiObject";
import {Vector2} from "../Vector2";
import {Font, newFont} from "love.graphics";

export class TextObject extends TextGuiObject {
    protected _absolutePosition: Vector2;
    protected _position: Vector2;
    protected font: Font;
    protected textAbsolutePosition: Vector2;
    size: Vector2;
    text: string;


    constructor(text: string, position: Vector2, size: Vector2) {
        super();

        this._absolutePosition = position;
        this._position = position;
        this.size = size;
        this.text = text;

        this.textAbsolutePosition = this._absolutePosition.clone();
        this.font = newFont(this.textSize)
    }



    public override recalculateAbsolutePosition() {
        super.recalculateAbsolutePosition();
        this.textAbsolutePosition = this.absolutePosition.clone()
    }
}