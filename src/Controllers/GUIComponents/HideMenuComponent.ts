import {ComponentInstance, ComponentState, GUIComponent} from "../../Classes/GUIComponent";
import {TextButton} from "../../Classes/GuiObjects/TextButton";
import {Frame} from "../../Classes/GuiObjects/Frame";
import {MouseButton} from "../../Utils/Constantes";
import {getFrontFaceWinding} from "love.graphics";
import {Column} from "../../Classes/GuiObjects/Column";

export interface HideMenuComponentProps extends ComponentInstance {
    hideButton: TextButton;
    window: Column;
}

export interface HideMenuComponentState extends ComponentState {
    isHide: boolean;
}



export class HideMenuComponent extends GUIComponent<HideMenuComponentState, HideMenuComponentProps> {
    constructor(props: HideMenuComponentProps, state: HideMenuComponentState) {
        super(props, state);
    }

    render(): void {
        const button: TextButton = this.instance.hideButton;

        button.onMouseClick(MouseButton.LeftMouseButton, () => {
            this.setState({isHide: !this.states.isHide});
        })


        for (const child of this.instance.window.getChildren()) {
            child.visible = this.states.isHide;
        }
    }

}