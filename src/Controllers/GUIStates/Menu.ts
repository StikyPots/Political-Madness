import {GUIState} from "../../Classes/GUIState";
import {Scheduler} from "../../Classes/Scheduler";
import {TextObject} from "../../Classes/GuiObjects/TextObject";
import {Vector2} from "../../Classes/Vector2";
import {registerGuiState} from "../StateRegistry";
import {COLOR, GameState, HorizontalTextAlignment} from "../../Utils/Constantes";
import {RectangleShape} from "../../Classes/GuiObjects/RectangleShape";
import {random} from "love.math";
import {Column} from "../../Classes/GuiObjects/Column";
import {Frame} from "../../Classes/GuiObjects/Frame";
import {rgbaColor} from "../../Utils/Functions";
import {HideMenuComponent} from "../GUIComponents/HideMenuComponent";
import {TextButton} from "../../Classes/GuiObjects/TextButton";


@registerGuiState(GameState.Menu)
export class Menu extends GUIState {
    load(): void {
        const hideMenu = new HideMenuComponent(
            {
                hideButton: new TextButton("x", new Vector2(), new Vector2(15,15)),
                window: new Column(new Vector2(15,15),  [
                    new TextObject("Hello, World", new Vector2(), new Vector2(120, 50)),
                    new TextObject("Hello, World", new Vector2(), new Vector2(120, 50))
                ])
            },
            {
                isHide: false,
            }
        )

        this.setComponent(hideMenu);
    }

    onCreate(): void {
    }

    update(dt: number): void {
        super.update(dt);
    }

    override draw(): void {
    }

}