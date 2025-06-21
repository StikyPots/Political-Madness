import {UiStateController} from "./Controllers/UiStateController";
import {GameState} from "./Utils/Constantes";
import {Vector2} from "./Classes/Vector2";
import {KeyConstant, Scancode} from "love.keyboard";
import {ImageButton} from "./Classes/GuiObjects/ImageButton";
import {Frame} from "./Classes/GuiObjects/Frame";
import {TestComponent} from "./Controllers/GUIComponents/TestComponent";
import {RectangleShape} from "./Classes/GuiObjects/RectangleShape";
import {getAsset} from "node:sea";
import {getResource} from "./Utils/Functions";


love.load = (): void => {
    UiStateController.setCurrentGameState(GameState.Menu)


    const imageButton = new ImageButton("res/AddToSqud.png", new Vector2())
    imageButton.position = new Vector2(100, 100)





    const testComponent = new TestComponent({
        rect: new RectangleShape(new Vector2(), new Vector2(100, 100))
    }, {})


    const frame = new Frame(new Vector2(100, 10), new Vector2(100, 100))
    frame.addChild(imageButton)

    frame.visible = false




    UiStateController.registerGuiObjectsForState(GameState.Menu, testComponent.registerComponent())
    UiStateController.registerGuiObjectToState(frame, GameState.Menu)
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