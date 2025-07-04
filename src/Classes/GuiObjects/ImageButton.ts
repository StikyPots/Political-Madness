import {ClickableGuiObject} from "../ClickableGuiObject";
import {Vector2} from "../Vector2";
import {ImageGuiObject} from "../ImageGuiObject";
import {ImageObject} from "./ImageObject";
import {Image} from "love.graphics";
import {AssetPath} from "../../Interfaces/res";

export class ImageButton extends ClickableGuiObject implements ImageGuiObject {
    protected _absolutePosition: Vector2;
    protected _position: Vector2;
    public size: Vector2;
    public readonly image: Image;
    public readonly imageId: string;
    public readonly scale: number;
    private readonly imageObject: ImageObject;


    constructor(imageId: AssetPath, position: Vector2, scale: number = 1) {
        super()

        this._position = position;
        this._absolutePosition = position;
        this.scale = scale;
        this.imageId = imageId;


        this.imageObject = new ImageObject(this.imageId, new Vector2(), this.scale);
        this.imageObject.parent = this;
        this.image = this.imageObject.image;

        this.size = new Vector2(
            this.imageObject.image.getWidth(),
            this.imageObject.image.getHeight()
        ).mul(scale);
    }

    override set position(value: Vector2) {
        super.position = value;
        this.imageObject.position = new Vector2();
    }



    override recalculateAbsolutePosition() {
        super.recalculateAbsolutePosition();
        this.imageObject.recalculateAbsolutePosition()
    }

    override draw() {
        this.imageObject.draw()
    }
}