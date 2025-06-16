import {Vector2} from "./Vector2";
import {COLOR} from "../Utils/Constantes";
import {rgbaColor} from "../Utils/Functions";
import {RGBA} from "love.math";

export abstract class GuiObject {
    protected abstract _position: Vector2;
    protected abstract _absolutePosition: Vector2;
    public abstract size: Vector2;

    public parent: GuiObject | null = null;
    public color: LuaMultiReturn<RGBA> = rgbaColor(...COLOR.WHITE);
    public visible: boolean = true;
    public fillMode: "line" | "fill" = "fill";
    public cornerRadius: Vector2 = new Vector2();

    public abstract update(dt: number): void

    public get absolutePosition(): Vector2 {
        return this._absolutePosition;
    }

    public set absolutePosition(value: Vector2) {
        this._absolutePosition = value;

    }
    public get position(): Vector2 {
        return this._position;
    }

    public set position(value:Vector2) {
        this._position = value;
        this.absolutePosition = this._updateAbsolutePosition();
    }

    private _updateAbsolutePosition(): Vector2 {
      return (this.parent?.absolutePosition ?? new Vector2())
            .add(this.position);
    }


    public setFillMode(value: "line" | "fill") {
        this.fillMode = value;
    }

    public setCornerRadius(value: Vector2) {
        this.cornerRadius = value;
    }

    public getFillMode(): "line" | "fill" {
        return this.fillMode
    }

    public getCornerRadius(): Vector2 {
        return this.cornerRadius
    }


    public draw() {

        if (!this.visible) {
            return;
        }


        love.graphics.push("all")

        love.graphics.setColor(this.color);
        love.graphics.rectangle(
            this.fillMode,
            this.absolutePosition.x,
            this.absolutePosition.y,
            this.size.x,
            this.size.y,
            this.cornerRadius.x,
            this.cornerRadius.y,
        )

        love.graphics.pop();
    }

}