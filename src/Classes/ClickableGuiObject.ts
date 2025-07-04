import {GuiObject} from "./GuiObject";
import {Vector2} from "./Vector2";
import {HAND_CURSOR, MouseButton} from "../Utils/Constantes";

export abstract class ClickableGuiObject extends GuiObject {
    private callbackContainer: Map<MouseButton, () => void> = new Map()

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
