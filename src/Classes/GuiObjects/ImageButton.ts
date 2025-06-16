import {ClickableGuiObject} from "../ClickableGuiObject";
import {Vector2} from "../Vector2";
import {ImageGuiObject} from "../ImageGuiObject";
import {Image, scale} from "love.graphics";
import {ImageObject} from "./ImageObject";

export class ImageButton extends ClickableGuiObject implements ImageGuiObject {
    protected _absolutePosition: Vector2;
    protected _position: Vector2;
    public size: Vector2;
    public readonly image: Image;
    public readonly imageId: string;
    public readonly scale: number;
    private readonly imageObject: ImageObject;


    constructor(imageId: string, position: Vector2, scale: number = 1) {
        super();

        this.scale = scale
        this.imageId = imageId
        this._position = position;
        this._absolutePosition = position;

        this.imageObject = new ImageObject(this.imageId, this.absolutePosition, this.scale)
        this.imageObject.parent = this;
        this.image = this.imageObject.image;

        this.size = new Vector2(this.image.getWidth(), this.image.getHeight())
            .mul(scale)
    }



    public override draw() {
        this.imageObject.draw();
    }
}