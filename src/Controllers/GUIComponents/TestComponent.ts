import {ComponentInstance, ComponentState, GUIComponent} from "../../Classes/GUIComponent";
import {rgbaColor} from "../../Utils/Functions";
import {COLOR} from "../../Utils/Constantes";
import {RectangleShape} from "../../Classes/GuiObjects/RectangleShape";
import {Vector2} from "../../Classes/Vector2";

interface TestComponentProps extends ComponentInstance {
    rect: RectangleShape;
}

interface TestComponentState extends ComponentState {

}

export class TestComponent extends GUIComponent<TestComponentState, TestComponentProps> {
    constructor(instance: TestComponentProps, state: TestComponentState) {
        super(instance, state);
    }

    load(): void {
        this.instance.rect.color = rgbaColor(...COLOR.GRAY)
        this.instance.rect.position = new Vector2(100, 100)
    }

    render(): void {
    }
}