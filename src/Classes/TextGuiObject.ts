import {GuiObject} from "./GuiObject"
import {Vector2} from "./Vector2"
import {AlignMode, Font, newFont} from "love.graphics"
import {RGBA} from "love.math"
import {rgbaColor} from "../Utils/Functions"
import {COLOR, HorizontalTextAlignment} from "../Utils/Constantes"
import {printStackTraceBundleOverride} from "typescript-to-lua/dist/transpilation/bundle";

export abstract class TextGuiObject extends GuiObject {

    protected abstract _absolutePosition: Vector2
    protected abstract _position: Vector2
    protected abstract textAbsolutePosition: Vector2;
    protected abstract font: Font;
    public abstract size: Vector2
    public abstract text: string

    public alignMode: AlignMode = "center"
    public textColor: LuaMultiReturn<RGBA> = rgbaColor(...COLOR.BLACK)
    public textVisible: boolean = true

    private _textSize: number = 15;
    private _horizontalAlignment: HorizontalTextAlignment = HorizontalTextAlignment.Top;



    public get textSize(): number {
        return this._textSize;
    }

    public set textSize(value: number) {
        this._textSize = value
        this.font = newFont(value)
    }

    public get horizontalAlignment(): number {
        return this._horizontalAlignment;
    }

    /*
    set textSize before horizontalAlignment or you will get alignment error
    * */
    public set horizontalAlignment(value: number) {
      this._horizontalAlignment = value;
      this.updateTextPosition(value);
    }

    private updateTextPosition(value: HorizontalTextAlignment) {
        const font = this.font
        const [_, wrappedLines] = font.getWrap(this.text, this.size.x)
        const numLines = wrappedLines.length
        const textHeight = font.getHeight() * font.getLineHeight() * numLines

        switch (value) {
            case HorizontalTextAlignment.Center:
                this.textAbsolutePosition.y = this.textAbsolutePosition.y + (this.size.y - textHeight) / 2
                break
            case HorizontalTextAlignment.Bottom:
                this.textAbsolutePosition.y = this.textAbsolutePosition.y + (this.size.y - textHeight)
                break
        }
    }

    update(dt: number): void {
        // override optional
    }

    public draw(): void {
        super.draw()

        if (!this.textVisible) return

        love.graphics.push("all")
        love.graphics.setFont(this.font)
        love.graphics.printf(
            [this.textColor, this.text],
            this.textAbsolutePosition.x,
            this.textAbsolutePosition.y,
            this.size.x,
            this.alignMode
        )
        love.graphics.pop()
    }
}
