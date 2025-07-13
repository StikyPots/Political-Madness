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
import {HideMenuComponent} from "../GUIComponents/HideMenuComponent";
import {TextButton} from "../../Classes/GuiObjects/TextButton";
import {ScrollingFrame} from "../../Classes/GuiObjects/ScrollingFrame";
import {GuiObject} from "../../Classes/GuiObject";
import {Localization} from "../Localization";
import {MenuComponent} from "../GUIComponents/MenuComponent";


@registerGuiState(GameState.Menu)
export class Menu extends GUIState {
    load(): void {
        const menuComponent = new MenuComponent
        (
            {
                Column: new Column(
                    new Vector2(0, (love.graphics.getHeight() - 350) / 2),

                    [
                        new TextObject("", new Vector2(), new Vector2(350, 100)),
                        new TextButton("", new Vector2(), new Vector2(350,50)),
                        new TextButton("", new Vector2(), new Vector2(350,50)),
                        new TextButton("", new Vector2(), new Vector2(350,50)),
                        new TextButton("", new Vector2(), new Vector2(350,50)),
                    ]
                )
            },
            {}
        )

        this.setComponent(menuComponent);
    }

    onCreate(): void {
    }

    update(dt: number): void {
        super.update(dt);

    
      }
    override draw(): void {

    }

}
