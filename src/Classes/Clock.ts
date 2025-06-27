//class that execute an action every time set in

import {warn} from "../Utils/Functions";
import {sleep} from "love.timer";
import {Scheduler, ScheduleThread} from "./Scheduler";


export class Clock {
    private threshold: number
    private readonly coThread: ScheduleThread;
    private running: boolean = true;
    callback: () => void;


    constructor(threshold: number = 10) {
        this.threshold = threshold;

        function loop(self: Clock): void {
            while (self.running) {


                if (self.callback) {
                    self.callback();
                }
            }
        }
    }

    public bind(fn: () => void): void {
    }
}
