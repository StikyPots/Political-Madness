import {ContainerGuiObject} from "../ContainerGuiObject";
import {Vector2} from "../Vector2";
import {GuiObject} from "../GuiObject";

export class Frame extends ContainerGuiObject {
    public update(dt: number): void {
        throw new Error("Method not implemented.");
    }
    protected _absolutePosition: Vector2;
    protected _position: Vector2;
    protected children: GuiObject[];
    size: Vector2;

    constructor(position: Vector2, size: Vector2, children: GuiObject[] = []) {
        super();

        this._position = position;
        this._absolutePosition = position;
        this.size = size;
        this.children = [];




        for (const child of children) {
            this.addChild(child);
        }
    }
}