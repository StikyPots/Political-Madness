import {GuiObject} from "./GuiObject";
import {deepCopy, printTable} from "../Utils/Functions";

export interface ComponentState {
    [key: string]: any;
}

export interface ComponentInstance {
    [key: string]: GuiObject;
}

export abstract class GUIComponent<S extends ComponentState = {}, I extends ComponentInstance = {}> {
    protected instance: I;
    protected states: S;
    protected _updateQueue: boolean = false

    protected constructor(instance: I, states: S) {
        this.instance = instance;
        this.states = states;
        this.render();
    }


    public getInstance(): GuiObject[] {
        const guiObjects: GuiObject[] = [];

        for (const key in this.instance) {
            const instance: GuiObject = this.instance[key];
            guiObjects.push(instance);
        }

        return guiObjects;
    }

    public setState(states: Partial<S>): void {
        this.states = { ...this.states, ...states } as S;
        this._updateQueue = true;

        this.render()
    }

    public update(dt: number): void {
        if (this._updateQueue) {
            this._updateQueue = false
        }
    }

    public clone() {
        return deepCopy(this)
    }

    /**
     * @deprecated Use `nothing` instead.
     */
    createElement<C extends  new (...args: any) => GuiObject>
    (
        name: string,
        ctor: C,
        ...properties: ConstructorParameters<C>
    ): InstanceType<C>
    {
        const guiObject = new ctor(...properties) as InstanceType<C>;
        print(printTable(this.instance));

        return guiObject;
    }

    //TODO: modify the logic when i added the logic for rendering component from UiStateController
    public registerComponent(): LuaMultiReturn<GuiObject[]> {
        return $multi(...this.getInstance())
    }

    abstract render(): void;

    //TODO: add more logic for the rendering sys
}