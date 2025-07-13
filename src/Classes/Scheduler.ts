import { error, warn } from "../Utils/Functions";

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
  private static suspendedThread: ScheduleThread[] = [];

  private static lastDt: number;



  public static getCurrentRunningThread(): number {
    return this.runningThread.length;
  }


  public static schedule(dt: number): void {
    this.lastDt = dt;

    for (const threadObj of this.runningThread) {

      const thread: LuaThread = threadObj.thread;

      if (threadObj.state === ScheduleThreadState.pause) {
        this.suspendedThread.push(threadObj);
        this.remove(threadObj);
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

  //base on the love.update function delta time;
  public static wait(s: number = love.timer.getAverageDelta()): void {
    let elapsed = 0;

    while (elapsed < s) {
      coroutine.yield();
      elapsed += this.lastDt;
    }
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


  public static getScheduleThread(thread: LuaThread): ScheduleThread | undefined {
    const sThread = this.runningThread.find((ScheduleThread: ScheduleThread) => thread === ScheduleThread.thread)
    return sThread;
  }


  public static resume(scheduleThread: ScheduleThread): void {
    if (scheduleThread.state !== ScheduleThreadState.pause) {
      warn("unable to resume the thread", scheduleThread.thread);
    }

    const index: number = this.suspendedThread.indexOf(scheduleThread);
    this.suspendedThread.splice(index, 1);

    this.runningThread.push(scheduleThread);

    scheduleThread.state = ScheduleThreadState.running;
  }

  // is recommended to use non arrow function
  //@example
  //```ts
  //  Scheduler.spawn(func, args1, args2)
  // ```

  public static spawn<T extends any[]>(fn: (...args: T) => void, ...args: T): ScheduleThread {
    const scheduleThread: ScheduleThread = {
      thread: coroutine.create(fn),
      args: args,
      state: ScheduleThreadState.running,
    }

    if (this.runningThread.find((t) => t.thread === scheduleThread.thread)) return;

    coroutine.resume(scheduleThread.thread, ...args);
    this.runningThread.push(scheduleThread);

    return scheduleThread;
  }
}
