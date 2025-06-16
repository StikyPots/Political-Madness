import {GuiObject} from "../Classes/GuiObject";
import {GameState} from "../Utils/Constantes";
import {Rgba} from "../Utils/Functions";

export interface DrawStateProperty {
    BackgroundColor: LuaMultiReturn<Rgba>;
}

export interface IGuiState {
    instances: GuiObject[];
    state: GameState;
    drawStateProperty: DrawStateProperty;



    onCreate(): void;
    update(dt: number): void;
    draw(): void;
    _load(): void;
}