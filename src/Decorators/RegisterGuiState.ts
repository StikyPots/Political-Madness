import {GameState} from "../Utils/Constantes";
import {IGuiState} from "../Interfaces/IGuiState";

/** @noSelf */
export function registerGUIState(state: GameState) {
    return function (constructor: { new(state: GameState): IGuiState }) {
        const stateGUI = new constructor(state);

        stateGUI._load()
    }
}