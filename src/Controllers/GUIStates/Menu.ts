import {GUIState} from "../../Classes/GUIState";
import {Scheduler} from "../../Classes/Scheduler";
import {TextObject} from "../../Classes/GuiObjects/TextObject";
import {Vector2} from "../../Classes/Vector2";
import {registerGuiState} from "../StateRegistry";
import {GameState, HorizontalTextAlignment} from "../../Utils/Constantes";
import {RectangleShape} from "../../Classes/GuiObjects/RectangleShape";
import {random} from "love.math";


@registerGuiState(GameState.Menu)
export class Menu extends GUIState {
    load(): void {


        Scheduler.spawn(() => {


            for (let i = 0; i < 300; i++) {
                this.createElement(RectangleShape,
                    new Vector2(random(0, 600), random(0, 600)),
                    new Vector2(random(0, 600), random(0, 600))
                )

                Scheduler.wait(10)
            }


        })

    }

    onCreate(): void {
    }

    update(dt: number): void {
        super.update(dt);
    }

    override draw(): void {
    }

}