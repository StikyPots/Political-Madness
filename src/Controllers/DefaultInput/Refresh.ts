import {InputConfig} from "../../Types/InputManager";
import {InputPriorityOrder, KEYS_CODE, restart} from "../../Utils/Constantes";

export const _: InputConfig  = {
    defaultName: "REFRESH_COMMAND",
    defaultKey: KEYS_CODE.F10,
    defaultPriorityOrder: InputPriorityOrder.Heavy,
    defaultCallback: function (gameProcess: boolean): void {
        love.quit();
    }
}