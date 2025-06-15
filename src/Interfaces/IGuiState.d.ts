import {GuiObject} from "../Classes/GuiObject";
import {GameState} from "../Utils/Constantes";
import {Rgba} from "../Utils/Functions";

export interface StateProperty {
    BackgroundColor: LuaMultiReturn<Rgba>;
}

export interface IGuiState {
    instances: GuiObject[];
    state: GameState;
    property: StateProperty;



    onCreate(): void;
    update(dt: number): void;
    draw(): void;
    _load(): void;
}