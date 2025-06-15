import {GuiObject} from "../GuiObject";
import {Vector2} from "../Vector2";

export class RectangleShape extends GuiObject {
    absolutePosition: Vector2;
    position: Vector2;
    size: Vector2;

    constructor(position: Vector2, size: Vector2) {
        super()

        this.position = position;
        this.size = size;
        this.absolutePosition = position;
    }

    update(dt: number): void {
    }
}