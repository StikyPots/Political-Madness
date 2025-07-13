import {ComponentInstance, ComponentState, GUIComponent} from "../../Classes/GUIComponent";
import {Table} from "../../Classes/GuiObjects/Table";


export interface SettingsComponentProps extends ComponentInstance {
    settingPage: Table;
}

export interface SettingsComponentState extends ComponentState {
}

export class SettingPageComponent extends GUIComponent<SettingsComponentState, SettingsComponentProps> {
    constructor(props: SettingsComponentProps, state: SettingsComponentState) {
        super(props, state);
    }

    render(): void {
        this.instance.settingPage
    }
}