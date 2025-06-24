import {GameState} from "../Utils/Constantes";
import {GUIState} from "../Classes/GUIState";


/** @noSelf */
export function registerGuiState(state: GameState){
   return function (this: any, constructor: { new(state: GameState): GUIState }) {

       if (StateRegistry.guiStateRegistry[state] !== undefined) {
           throw new Error("GuiState already registered" + GameState[state]);
       }

       StateRegistry.guiStateRegistry[state] = constructor;
   }
}



export class StateRegistry {
    static guiStateRegistry: Partial<Record<GameState, new (state: GameState) => GUIState>> = {};


    static getRegisteredGUIConstructor(state: GameState):(new (state: GameState) => GUIState) | undefined {
        return this.guiStateRegistry[state];
    }

    static getAllRegisteredGUIStates(): string[] {
        return Object.keys(this.guiStateRegistry) ;
    }


    static createGuiState(state: GameState): GUIState | undefined {
        if (!this.guiStateRegistry[state]) {
            return undefined;
        }

        return new this.guiStateRegistry[state](state);
    }
}