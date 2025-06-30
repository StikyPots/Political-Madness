import {ContainerGuiObject} from "../ContainerGuiObject";
import {Vector2} from "../Vector2";
import {GuiObject} from "../GuiObject";
import {rgbaColor} from "../../Utils/Functions";
import {COLOR} from "../../Utils/Constantes";

export class Column extends ContainerGuiObject {
    protected _absolutePosition: Vector2;
    protected _position: Vector2;
    protected children: GuiObject[];
    private _padding: Vector2 = new Vector2(10,10)
    private isOccupiedSizeActivate: boolean = false
    size: Vector2;



    constructor(position: Vector2, children: GuiObject[]) {
        super();

        this._position = position;
        this._absolutePosition = position;
        this.size = new Vector2();
        this.children = [];


        for (const child of children) {
            this.addChild(child);
        }

        this.calculateLayout();
    }

    private calculateLayout(): void {
        let cursorY: number = 0;

        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];

            child.position = new Vector2(0, cursorY);
            cursorY += child.size.getY() + this.padding.getY();

            if (!this.isOccupiedSizeActivate) {
                continue;
            }

            this.size = new Vector2(child.size.getX() + this.padding.getX(), cursorY - this.padding.getY());
        }
    }

    public setOccupiedSize() {
        this.isOccupiedSizeActivate = !this.isOccupiedSizeActivate;
        this.calculateLayout()
    }


    override addChild(guiObject: GuiObject) {
        super.addChild(guiObject);
        this.calculateLayout()
    }

   public set padding(padding: Vector2) {
        this._padding = padding;
        this.calculateLayout();
   }

   public  get padding(): Vector2 {
        return this._padding;
   }


    update(dt: number): void {
    }
}