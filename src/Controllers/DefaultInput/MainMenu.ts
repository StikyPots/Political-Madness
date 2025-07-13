import {UiStateController} from "../UiStateController";
import {GameState, KEYS_CODE, InputPriorityOrder} from "../../Utils/Constantes";
import {InputConfig} from "../../Types/InputManager";

export const _: InputConfig = {
    defaultName: "ESCAPE_MAIN_MENU",
    defaultKey: KEYS_CODE.ESCAPE,
    defaultPriorityOrder: InputPriorityOrder.Heavy,
    defaultCallback: (_gameProcess: boolean) => {
        const last: GameState = UiStateController.getCurrentState();


        if (UiStateController.getCurrentState() === GameState.Menu) {
            UiStateController.setCurrentGameState(last);
            return;
        }

        UiStateController.setCurrentGameState(GameState.Menu); //TODO: in future pose the game Thread;
    }
}