import {ComponentInstance, ComponentState, GUIComponent} from "../../Classes/GUIComponent";
import {Column} from "../../Classes/GuiObjects/Column";
import {TextButton} from "../../Classes/GuiObjects/TextButton";
import {TextObject} from "../../Classes/GuiObjects/TextObject";
import {GuiObject} from "../../Classes/GuiObject";
import {Localization} from "../Localization";
import {COLOR, GameState, HorizontalTextAlignment, MouseButton} from "../../Utils/Constantes";
import {rgbaColor} from "../../Utils/Functions";
import {UiStateController} from "../UiStateController";

export interface MenuComponentProps extends ComponentInstance {
    Column: Column;
}

export interface MenuComponentState extends ComponentState {
}



export class MenuComponent extends GUIComponent<MenuComponentState, MenuComponentProps> {
    constructor(props: MenuComponentProps, state: MenuComponentState) {
        super(props, state);
    }

    render(): void {

        const column: Column = this.instance.Column;
        const children: GuiObject[] = column.getChildren();

        const titleText = children[0] as TextObject;
        const playBtn = children[1] as TextButton;
        const cardsBtn = children[2] as TextButton;
        const settingBtn = children[3] as TextButton;
        const existBtn = children[4] as  TextButton;


        titleText.text = Localization.get("title");

        titleText.textSize = 35;
        titleText.alignMode = "center";
        titleText.horizontalAlignment = HorizontalTextAlignment.Center;
        titleText.textColor = rgbaColor(...COLOR.WHITE);
        titleText.visible = false;


        playBtn.text = Localization.get("play")
        cardsBtn.text = Localization.get("cards")
        settingBtn.text = Localization.get("setting")
        existBtn.text = Localization.get("leave");


        settingBtn.onMouseClick(MouseButton.LeftMouseButton, () => {
            UiStateController.setCurrentGameState(GameState.Setting);
        });

        existBtn.onMouseClick(MouseButton.LeftMouseButton, () => {
            love.quit();
        });



        for (const child of children) {
            if (child instanceof TextObject) {
                continue;
            }

            const obj = child as TextButton;

            obj.textColor = rgbaColor(...COLOR.WHITE);
            obj.textSize = 24;
            obj.alignMode = "center";
            obj.horizontalAlignment = HorizontalTextAlignment.Center;
            obj.visible = false;
        }
    }

}