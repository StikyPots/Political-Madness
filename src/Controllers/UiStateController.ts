import {GameState} from "../Utils/Constantes";
import {GuiObject} from "../Classes/GuiObject";

export class UiStateController {

    private static guiObjectsByState: Map<GameState, GuiObject[]> = new Map()
    private static stateGuiContainers: Map<GuiObject, any> = new Map()
    private static clickableGuiObjects: Map<GuiObject, any> = new Map();
    private static currentState: GameState;



    public static setCurrentGameState(state: GameState) {
        this.currentState = state

        if (!this.guiObjectsByState.has(state)) {
            this.guiObjectsByState.set(state, [])
        }
    }

    public static getCurrentState(): GameState {
        return this.currentState;
    }

    public static registerGuiObjectsForCurrentState() {

    }

    public static addGuiObjectToState(guiObject: GuiObject, state: GameState) {
        if (!this.guiObjectsByState.get(state)) {
            this.guiObjectsByState.set(state, [])
        }

        const guiObjectsState = this.guiObjectsByState.get(state) as GuiObject[]
        guiObjectsState.push(guiObject);
    }

    public static drawCurrentState() {
        const guiObjectsToRender: GuiObject[] = this.guiObjectsByState.get(this.currentState) || []

        for (const guiObject of guiObjectsToRender) {
            guiObject.draw();
        }
    }

    public static updateCurrentState() {
    }
}