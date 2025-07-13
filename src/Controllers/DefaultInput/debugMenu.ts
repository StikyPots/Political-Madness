import {UiStateController} from "../UiStateController";
import {GameState, KEYS_CODE, InputPriorityOrder} from "../../Utils/Constantes";
import {InputConfig} from "../../Types/InputManager";
import {Scheduler} from "../../Classes/Scheduler";

export function formatLuaMemory(): string {
    // 1) Run a full GC pass so we measure “live” memory only
    collectgarbage("collect");
    // 2) Ask Lua how many KB it’s using
    const kb = collectgarbage("count");
    // 3) Pick the best unit
    if (kb < 1024) {
        return `${kb.toFixed(2)} KB`;
    }
    const mb = kb / 1024;
    if (mb < 1024) {
        return `${mb.toFixed(2)} MB`;
    }
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
}

export const _: InputConfig = {
    defaultName: "DEBUG_MENU",
    defaultKey: KEYS_CODE.F9,
    defaultPriorityOrder: InputPriorityOrder.Heavy,

    defaultCallback: (_gameProcess: boolean) => {
        collectgarbage("collect")
        print
        (
            love.window.getTitle() + "\n",
            "running thread count: " + Scheduler.getCurrentRunningThread() + "\n",
            "fps: " + love.timer.getFPS()+ "\n",
            "avg delta: " + love.timer.getAverageDelta()+ "\n",
            "memory used: " + formatLuaMemory() + "\n"
        )
    }
}