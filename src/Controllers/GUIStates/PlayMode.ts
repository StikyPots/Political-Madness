import {GUIState} from "../../Classes/GUIState";
import {registerGuiState} from "../StateRegistry";
import {GameState} from "../../Utils/Constantes";
import {RectangleShape} from "../../Classes/GuiObjects/RectangleShape";
import {Vector2} from "../../Classes/Vector2";


@registerGuiState(GameState.Game)
export class PlayMode extends GUIState {

    public draw(): void {
    }

    public load(): void {
        const square = this.createElement(RectangleShape, new Vector2(), new Vector2(50, 150));
    }

    public onCreate(): void {
    }

}