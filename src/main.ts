import {UiStateController} from "./Controllers/UiStateController";
import {GameState} from "./Utils/Constantes";
import {RectangleShape} from "./Classes/GuiObjects/RectangleShape";
import {Vector2} from "./Classes/Vector2";

love.load = (): void => {
    UiStateController.setCurrentGameState(GameState.Menu)
    
    UiStateController.addGuiObjectToState(
        new RectangleShape(new  Vector2(), new Vector2(100,100)),
        GameState.Menu
    )
}

love.update = (dt: number): void => {
}


love.draw = (): void => {
    UiStateController.drawCurrentState()
}

