import {GuiObject} from "./GuiObject";
import {Vector2} from "./Vector2";
import {HAND_CURSOR, MouseButton} from "../Utils/Constantes";

export abstract class ClickableGuiObject extends GuiObject {
    private callbackContainer: Map<MouseButton, () => void> = new Map()

    public isInside(vector: Vector2) {
        const x: number = vector.x;
        const y: number = vector.y;

        return (
            x >= this.absolutePosition.getX() &&
            x <= this.absolutePosition.getX() + this.size.getX() &&
            y >= this.absolutePosition.getY() &&
            y <= this.absolutePosition.getY() + this.size.getY()
        )
    }

    public update(dt: number) {
        const mouseX: number = love.mouse.getX();
        const mouseY: number = love.mouse.getY();

        if (this.isInside(new Vector2(mouseX, mouseY))) {
            love.mouse.setCursor(HAND_CURSOR)
        }
    }

    public onMouseClick(mouseButton: MouseButton, callback: () => void) {
        this.callbackContainer.set(mouseButton, callback);
    }

    public _registerCallbackOnMouseClick(x: number, y: number, button: number, istouch: boolean, presses: number) {
        if (this.isInside(new Vector2(x, y)) && this.callbackContainer.has(button)) {
            const callback = this.callbackContainer.get(button) as () => void
            callback();
        }
    }
}
