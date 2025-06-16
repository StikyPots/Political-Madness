import {GuiObject} from "./GuiObject";
import {Image} from "love.graphics";
import {Vector2} from "./Vector2";

export abstract class ImageGuiObject extends GuiObject {

    public readonly abstract imageId: string;
    public readonly abstract image: Image;
    public abstract scale: number;



    public override draw() {
        if (!this.visible) {
            return;
        }

        love.graphics.push("all");


        love.graphics.draw(
            this.image,
            this.absolutePosition.x,
            this.absolutePosition.y,
            0,
            this.scale,
            this.scale)

        love.graphics.pop()
    }
}