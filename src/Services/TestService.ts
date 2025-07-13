import {Heartbeat, OnStart, service} from "./Utils/ServiceRegistry";
import {Scheduler} from "../Classes/Scheduler";

@service({ loadOrder: 0 })
export class TestService implements OnStart, Heartbeat {


    heartbeat(dt: number): void {
    }



    onStart(): void {
    }

    getItem(item:any): any {
        return item
    }
}
