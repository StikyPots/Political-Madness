import {GameState, MouseButton} from "../Utils/Constantes";
import {GuiObject} from "../Classes/GuiObject";
import {ClickableGuiObject} from "../Classes/ClickableGuiObject";
import {ContainerGuiObject} from "../Classes/ContainerGuiObject";

export class UiStateController {

    //TODO: add a logic to render component trough UiStateController
    private static guiObjectsByState: Map<GameState, GuiObject[]> = new Map()
    private static stateGuiContainers: Map<GuiObject, any> = new Map()
    private static clickableGuiObjects: Map<GameState, ClickableGuiObject[]> = new Map();
    private static currentState: GameState;



    public static getGuiObjectsInState(state: GameState): GuiObject[] {
        return this.guiObjectsByState.get(state) || [];
    }


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


    public static registerGuiObjectsForState(state: GameState, guiObjects: GuiObject[]) {
        const currentContainer = this.guiObjectsByState.get(state) as GuiObject[]

        for (const guiObject of guiObjects) {
            if (currentContainer.find((obj: GuiObject) => obj === guiObject)) {
                continue;
            }

            UiStateController.registerGuiObjectToState(guiObject, state)
        }
    }

    public static registerGuiObjectToState(guiObject: GuiObject, state: GameState) {
        if (!this.guiObjectsByState.get(state)) {
            this.guiObjectsByState.set(state, [])
        }
        const guiObjectsState = this.guiObjectsByState.get(state) as GuiObject[]

        if (guiObject instanceof ClickableGuiObject) {
            this.bindGuiObjectClickHandler(guiObject, state)
        }


        if (guiObject instanceof ContainerGuiObject) {
            for (const child of guiObject.getChildren()) {
                this.registerGuiObjectToState(child, state)
            }
        }

        guiObjectsState.push(guiObject);
    }

    public static drawCurrentState() {
        const guiObjectsToRender: GuiObject[] = this.guiObjectsByState.get(this.currentState) || []

        for (const guiObject of guiObjectsToRender) {
            guiObject.draw();
        }
    }


    private static bindGuiObjectClickHandler(guiObject: ClickableGuiObject, state: GameState) {
        if (this.clickableGuiObjects.get(state) === undefined) {
            this.clickableGuiObjects.set(state, [])
        }

        const clickableGuiObjects = this.clickableGuiObjects.get(state) as ClickableGuiObject[]
        clickableGuiObjects.push(guiObject)
    }



    public static buttonGuiHandler(x: number, y:number, button: MouseButton, istouch: boolean, presses: number) {
        for (const guiObject of this.clickableGuiObjects.get(this.currentState) || []) {
            guiObject._registerCallbackOnMouseClick(x, y, button, istouch, presses)
        }
    }

    public static updateCurrentState() {
    }
}