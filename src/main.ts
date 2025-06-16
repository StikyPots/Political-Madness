import {UiStateController} from "./Controllers/UiStateController";
import {GameState, HorizontalTextAlignment, MouseButton} from "./Utils/Constantes";
import {Vector2} from "./Classes/Vector2";
import {KeyConstant, Scancode} from "love.keyboard";
import {ImageButton} from "./Classes/GuiObjects/ImageButton";
import {RectangleShape} from "./Classes/GuiObjects/RectangleShape";
import {TextObject} from "./Classes/GuiObjects/TextObject";
import {TextButton} from "./Classes/GuiObjects/TextButton";

love.load = (): void => {
    UiStateController.setCurrentGameState(GameState.Menu)

    const b = new RectangleShape(new Vector2(100,100), new Vector2(100,100))
    const ok = new ImageButton("AddToSqud.png", new Vector2(100,100))

    const test = new TextButton("Hello, world", new Vector2(), new Vector2(100,100))
    test.textSize = 20;
    test.horizontalAlignment = HorizontalTextAlignment.Center

    test.onMouseClick(MouseButton.LeftMouseButton, () => print("ok"))

    UiStateController.registerGuiObjectToState(b, GameState.Menu)
    UiStateController.registerGuiObjectToState(ok, GameState.Menu)
    UiStateController.registerGuiObjectToState(test, GameState.Menu)


}

love.update = (dt: number): void => {
}


love.draw = (): void => {
    UiStateController.drawCurrentState()
}

love.keypressed = (key: KeyConstant, scancode:Scancode, isrepeat: boolean) => {

}


love.mousepressed = (x: number, y: number, button: number, isTouch: boolean, presses: number) => {
    UiStateController.buttonGuiHandler(x, y, button, isTouch, presses)
}