import {GUIState} from "../../Classes/GUIState";
import {registerGuiState} from "../StateRegistry";
import {GameState} from "../../Utils/Constantes";
import {TextObject} from "../../Classes/GuiObjects/TextObject";
import {Vector2} from "../../Classes/Vector2";
import {Table} from "../../Classes/GuiObjects/Table";
import {SettingPageComponent} from "../GUIComponents/SettingPageComponent";


@registerGuiState(GameState.Setting)
export class Settings extends GUIState {
    public draw(): void {
    }

    public load(): void {

    }

    public onCreate(): void {
        
    }

}