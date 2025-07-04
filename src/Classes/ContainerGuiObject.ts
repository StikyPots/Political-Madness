import {GuiObject} from "./GuiObject";
import {Vector2} from "./Vector2";

export abstract class  ContainerGuiObject extends GuiObject {
    protected abstract _absolutePosition: Vector2;
    protected abstract _position: Vector2;
    protected abstract children: GuiObject[];
    abstract size: Vector2;


    addChild(guiObject: GuiObject): void {
        guiObject.parent = this;
        guiObject.recalculateAbsolutePosition()
        guiObject.position = guiObject.absolutePosition.sub(this._absolutePosition)
        this.children.push(guiObject)
    };


    getChildren(): GuiObject[] {
        return this.children;
    }



    draw() {
        super.draw();

        for (const child of this.children) {
            child.draw();
        }
    }
}
