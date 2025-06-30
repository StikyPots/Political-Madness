import {UiStateController} from "./Controllers/UiStateController";
import {ARROW_CURSOR, GameState, HAND_CURSOR} from "./Utils/Constantes";
import {Vector2} from "./Classes/Vector2";
import {KeyConstant, Scancode} from "love.keyboard";
import {ImageButton} from "./Classes/GuiObjects/ImageButton";
import {Frame} from "./Classes/GuiObjects/Frame";
import {TestComponent} from "./Controllers/GUIComponents/TestComponent";
import {RectangleShape} from "./Classes/GuiObjects/RectangleShape";
import {getAsset, requireAllStates, rgbaColor, wait, warn} from "./Utils/Functions";;
import {Scheduler} from "./Classes/Scheduler";
import {print} from "love.graphics";



love.load = (): void => {
    requireAllStates()
    UiStateController.initializeGuiStates()
    UiStateController.setCurrentGameState(GameState.Menu)
}

love.update = (dt: number): void => {
    Scheduler.schedule(dt);

    love.mouse.setCursor(ARROW_CURSOR)
    UiStateController.updateCurrentState(dt)
}


love.draw = (): void => {
    UiStateController.drawCurrentState()
}

love.keypressed = (key: KeyConstant, scancode:Scancode, isrepeat: boolean) => {

}


love.mousepressed = (x: number, y: number, button: number, isTouch: boolean, presses: number) => {
    UiStateController.buttonGuiHandler(x, y, button, isTouch, presses)
}