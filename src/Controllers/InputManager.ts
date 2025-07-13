import {deepCopy, error, printTable} from "../Utils/Functions";
import {theSpecifiedPathDoesNotExist} from "typescript-to-lua/dist/cli/diagnostics";
import {KeyConstant, Scancode} from "love.keyboard";
import {InputPriorityOrder} from "../Utils/Constantes";
import {InputConfig} from "../Types/InputManager";

export interface InputLog {
    actionName: string
    key: KeyConstant;
    priorityOrder: InputPriorityOrder,
    callback: (gameProcessed: boolean) => void
}

export class InputManager {

    private static actions: Record<InputPriorityOrder, Map<string, InputLog>> = {
        [InputPriorityOrder.Low]: new Map(),
        [InputPriorityOrder.Medium]: new Map(),
        [InputPriorityOrder.Heavy]: new Map(),
    }
    
    private static lookup: Map<string, InputPriorityOrder> = new Map()


    public static bindAction
    (
        actionName: string, priorityOrder: InputPriorityOrder, key: KeyConstant, callback: (gameProcessed: boolean) => void
    ): void
    {

       this.actions[priorityOrder].set(actionName, 
           { 
               actionName: actionName, 
               key: key,
               callback: callback, 
               priorityOrder: priorityOrder, 
           }
       );

       this.lookup.set(actionName, priorityOrder);
    }
    
    public static unbindAction(actionName: string) {
        const priorityOrder: InputPriorityOrder = this.lookup.get(actionName);
        this.actions[priorityOrder].delete(actionName);
    }

    public static getBindInputs(): InputLog[] {
        return [
            ...this.actions[InputPriorityOrder.Low].values(),
            ...this.actions[InputPriorityOrder.Medium].values(),
            ...this.actions[InputPriorityOrder.Heavy].values(),
        ]
    }

    public static bindDefaultGameInput(): void {
        const paths = "Controllers/DefaultInput/"

        for (const path of love.filesystem.getDirectoryItems(paths)) {
            const realPath = "../" + paths + path.substring(0, path.length - 4)
            try {

                const module = require(realPath);
                const inputConfig: InputConfig = module["_"]

                this.bindAction
                (
                    inputConfig.defaultName,
                    inputConfig.defaultPriorityOrder,
                    inputConfig.defaultKey,
                    inputConfig.defaultCallback,
                )


            } catch (e) {
                error("[skip_DefaultInputBinding]: ", realPath)
            }

        }
    }

    //TODO: refactor the logic for inputListener
    public static bindsOnLoveEvent(key: KeyConstant, scancode:Scancode, isrepeat: boolean): void {

        const order = [
            InputPriorityOrder.Heavy,
            InputPriorityOrder.Medium,
            InputPriorityOrder.Low
        ];

        let gameProcessed = false;


        for (const priority of order) {
            for (const input of this.actions[priority].values()) {
                if (input.key !== key) continue;

                input.callback(gameProcessed);
            }
        }
    }
}