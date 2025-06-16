import {GuiObject} from "../GuiObject";
import {Vector2} from "../Vector2";

export class RectangleShape extends GuiObject {
    protected _absolutePosition: Vector2;
    protected _position: Vector2;
    public size: Vector2;

    constructor(position: Vector2, size: Vector2) {
        super()

        this.size = size;
        this._absolutePosition = position;
        this._position = position;
    }

    update(dt: number): void {
    }
}