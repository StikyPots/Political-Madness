import {GameState} from "../Utils/Constantes";
import {GuiObject} from "./GuiObject";
import {RectangleShape} from "./GuiObjects/RectangleShape";
import {Vector2} from "./Vector2";
import {GUIComponent} from "./GUIComponent";
import { TextButton } from "./GuiObjects/TextButton";


export abstract class GUIState {
    state: GameState;
    instances: GuiObject[] = [];
    components: GUIComponent[] = [];

    constructor(state: GameState) {
        this.state = state;
        this.onCreate();
    }

    abstract onCreate(): void;

    abstract load(): void;

    abstract draw(): void;

    getInstances(): GuiObject[] {
        return this.instances || [];
    }

    public getState(): string {
        return GameState[this.state];
    }

    createElement<C extends  new (...args: any) => GuiObject>
    (
        ctor: C,
        ...properties: ConstructorParameters<C>
    ): InstanceType<C>
    {
        const guiObject = new ctor(...properties) as InstanceType<C>;
        this.instances.push(guiObject);

        return guiObject;
    }


    public setComponent(...components: GUIComponent[]): void {
        this.components.push(...components);

        for (const component of components) {
            this.instances.push(...component.getInstance());
        }
    }


    public getComponent<C extends GUIComponent>(componentClass: new (...args: any[]) => C): C | undefined {
        return this.components.find((comp): comp is C => comp instanceof componentClass);
    }


    update(dt: number): void {
        for (const component of this.components) {
            component.update(dt);
        }
    }

}