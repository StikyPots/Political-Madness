import {ComponentInstance, ComponentState, GUIComponent} from "../../Classes/GUIComponent";

export interface MenuComponentProps extends ComponentInstance {

}

export interface MenuComponentState extends ComponentState {

}



export class MenuComponent extends GUIComponent<MenuComponentProps, MenuComponentState> {
    constructor(props: MenuComponentProps, state: MenuComponentState) {
        super(props, state);
    }

    render(): void {
    }

}