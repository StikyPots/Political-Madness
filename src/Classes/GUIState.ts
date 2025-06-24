import {GameState} from "../Utils/Constantes";
import {GuiObject} from "./GuiObject";
import {RectangleShape} from "./GuiObjects/RectangleShape";
import {Vector2} from "./Vector2";
import {GUIComponent} from "./GUIComponent";


export abstract class GUIState  {
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
    abstract update(dt: number): void;

    getInstances(): GuiObject[] {
        return this.instances || [];
    }

    getState(): GameState {
        return this.state;
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

    setComponent(...components: GUIComponent[]): void {
        this.components.push(...components);

        for (const component of components) {
            this.instances.push(...component.getInstance());
        }
    }


}