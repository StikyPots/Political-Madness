import {print} from "love.graphics";

export class Debugger {
   static toggle: boolean = false;
   static guiCount: number = 0;
   static memory: number = 0;



    public static draw() {
        if (this.toggle) {
            print(tostring(love.graphics.getStats().drawcalls), 0, 0)
        }
    }
}