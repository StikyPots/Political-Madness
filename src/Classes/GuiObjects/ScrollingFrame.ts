import {ContainerGuiObject} from "../ContainerGuiObject";
import {Vector2} from "../Vector2";
import {GuiObject} from "../GuiObject";
import {mouse, rgbaColor} from "../../Utils/Functions";
import {RectangleShape} from "./RectangleShape";
import {COLOR} from "../../Utils/Constantes";

export class ScrollingFrame extends ContainerGuiObject {
    protected _absolutePosition: Vector2;
    protected _position: Vector2;
    protected children: GuiObject[];
    private scrollPosition: Vector2;
    private scrollbar: RectangleShape;
    private scrollingSpeed: number = 10;
    public size: Vector2;
    private _padding = new Vector2(10,10)

    public scrollbarSize = new Vector2(10, 50)


    constructor(position: Vector2, size: Vector2, children: GuiObject[]) {
        super();

        this._position = position;
        this._absolutePosition = position;
        this.size = size;
        this.children = [];

        this.scrollPosition = new Vector2();

        this.scrollbar = new RectangleShape(new Vector2(this.size.x - this.scrollbarSize.x, 0), this.scrollbarSize)
        this.scrollbar.color = rgbaColor(...COLOR.GRAY)
        this.scrollbar.parent = this

        print(this.scrollbar.position)


        for (const child of children) {
            this.addChild(child);
        }
    }

    update(dt: number): void {
    }



    private layoutGuiObject() {

        let cursorY = 0;

        for (let i: number = 0; i < this.children.length; ++i) {
            const child: GuiObject = this.children[i];

            child.position = new Vector2(0, cursorY);
            cursorY += child.size.getY() + this._padding.getY();
        }
    }



    onWheelMove(dx: number, dy: number): void {
        if (!this.isInside(mouse.getMousePosition())) {
            return
        }

        const maxHeight = Math.max(
            ...this.children.map(c => c.position.y + (c as any).size.y),
            this.size.y
        )

        const maxScrollY = maxHeight - this.size.y;

        this.scrollPosition = this.scrollPosition.add(
            new Vector2(0, dy * this.scrollingSpeed)
        )
    }

    public override draw() {
        love.graphics.push()

        love.graphics.setScissor(
            this._absolutePosition.x,
            this._absolutePosition.y,
            this.size.x,
            this.size.y
        )

        love.graphics.translate(
            this._absolutePosition.x - this.scrollPosition.x,
            this._absolutePosition.y - this.scrollPosition.y
        )

        super.draw();

        love.graphics.setScissor();
        love.graphics.pop()
    }
}
