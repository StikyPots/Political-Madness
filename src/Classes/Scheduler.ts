import {error, warn} from "../Utils/Functions";

export enum ScheduleThreadState {
    running,
    pause,
    dead
}

export interface ScheduleThread {
    thread: LuaThread;
    args: any[];
    state: ScheduleThreadState;
}

export class Scheduler {
    private static runningThread: ScheduleThread[] = [];




    public static schedule(dt: number): void {
        for (const threadObj of  this.runningThread) {

            const thread: LuaThread = threadObj.thread;

            if (threadObj.state === ScheduleThreadState.pause) {
                continue
            }

            if (coroutine.status(thread) === "dead") {
                const i: number = this.runningThread.indexOf(threadObj);
                this.runningThread.splice(i, 1);
                continue;
            }


            const [success, ok] = coroutine.resume(thread, ...threadObj.args);

            if (!success) {
                error(debug.traceback(thread, ok));
            }
        }
    }

    public static wait(s: number = os.clock()): void {
        const t0: number = os.clock();

        do {
            coroutine.yield();
        } while (os.clock() - t0 <= s)
    }

    public static delay(delay: number, func: () => void): void {
        Scheduler.spawn((): void => {
            Scheduler.wait(delay);
            func()
        })
    }


    public static remove(scheduleThread: ScheduleThread): void {
       const i: number = this.runningThread.indexOf(scheduleThread)

        if (i === -1) {
            return;
        }

        this.runningThread.splice(i, 1);
    }

    public static pause(scheduleThread: ScheduleThread): void {
        scheduleThread.state = ScheduleThreadState.pause;
    }


    public static resume(scheduleThread: ScheduleThread): void {
        if (scheduleThread.state !== ScheduleThreadState.pause) {
            warn("unable to resume the thread", scheduleThread.thread);
        }
        scheduleThread.state = ScheduleThreadState.running;
    }

    // is recommended to use non arrow function
    //@example
    //```ts
    //  Scheduler.spawn(func, args1, args2)
    // ```

    public static spawn<T extends any[]>(fn: (...args: T) => void, ...args: T): void {
        const scheduleThread: ScheduleThread = {
            thread: coroutine.create(fn),
            args: args,
            state: ScheduleThreadState.running,
        }

        coroutine.resume(scheduleThread.thread, ...args);
        this.runningThread.push(scheduleThread);
    }
}