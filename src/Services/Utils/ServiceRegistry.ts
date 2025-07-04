import {ScrollingFrame} from "../../Classes/GuiObjects/ScrollingFrame";
import {Scheduler} from "../../Classes/Scheduler";
import {FileInfo} from "love.filesystem";
import {error, printTable, warn} from "../../Utils/Functions";
import {TestService} from "../TestService";
import {Services} from "../../Interfaces/Services";

export interface ServiceProperty {
    loadOrder: number;
}


export interface OnStart {
    onStart(): void;
}

export interface Heartbeat {
    heartbeat(dt: number): void;
}

export function service(properties?: Partial<ServiceProperty>) {
    return function<T extends new (...args: any) => {}>(this: any, constructor: T): void  {
        ServiceRegistry.bindService(constructor, properties)
    }
}


export class ServiceRegistry {

    private static initService: {ctor: new (...args: any[]) => any; properties: Partial<ServiceProperty> }[] = []
    private static onStartService: OnStart[] = [];
    private static onHeartbeatService:  Heartbeat[] = [];
    private static registeredService: {name: string, instance: object}[] = [];


    public static bindService<T extends new (...args: any) => any>(
        service: T, property: Partial<ServiceProperty>): void

    {
        this.initService.push({ ctor: service, properties: property })
    }

    public static getService<T extends keyof Services>(name: T): Services[T] {
        const service = this.registeredService.find((s) => s.name === name);
        if (!service) {
            throw new Error("❌ Service not found: " + name);
        }

        return service.instance as Services[T];
    }

    private static initialize() {
        for (const service of this.initService) {
            const instance = new service.ctor()


            if ("onStart" in instance && typeof instance.onStart === "function") {
                this.onStartService.push(instance);
            }

            if ("heartbeat" in instance && typeof instance.heartbeat === "function") {
                this.onHeartbeatService.push(instance);
            }


            this.registeredService.push({name: instance.constructor.name as string, instance: instance})
        }
    }


    public static getRegisteredService(): string[] {
        return this.registeredService.map(value => value.name);
    }

    private static bindOnStart() {
        for (const onStart of this.onStartService) {
            try { onStart.onStart(); } catch (e) { warn("[ServiceRegistry]: " + e) }
        }
    }

    public static bindOnHeartbeat(dt: number): void {
        for (const heartbeat of this.onHeartbeatService) {
          try { Scheduler.spawn(heartbeat.heartbeat, dt) } catch (e) { error("ok") }
        }
    }

    private static requireAllService() {
        const path: string = "Services/"
        const services: string[] = love.filesystem.getDirectoryItems(path);

        for (const service of services) {
            const fileInfo = love.filesystem.getInfo(path + service)

            if (fileInfo.type !== "file" && !service.endsWith(".lua", 4)) {
                continue;
            }


            const luaFilePath: string = "../" + path + service.substring(0, service.length - 4);
            require(luaFilePath)
        }
    }


    static init() {
        this.requireAllService();
        this.initialize();
        this.bindOnStart();
    }
}