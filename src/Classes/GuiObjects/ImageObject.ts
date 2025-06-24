import {ImageGuiObject} from "../ImageGuiObject";
import {Vector2} from "../Vector2";
import {Image, newImage, scale} from "love.graphics";

export class ImageObject extends ImageGuiObject {

    public readonly image: Image;
    public readonly imageId: string;
    protected _absolutePosition: Vector2;
    protected _position: Vector2;
    public size: Vector2;
    public scale: number;


    constructor(imageId: string, position: Vector2, scale: number = 1) {
        super();

        if (love.filesystem.getInfo(imageId) === undefined) {
            throw Error("" + imageId)
        }

        this.scale = scale;
        this.imageId = imageId;
        this.image = newImage(imageId)

        this.size = new Vector2(this.image.getWidth(), this.image.getHeight())
            .mul(scale);

        this._absolutePosition = position;
        this._position = position;
    }


    update(dt: number): void {
    }


}