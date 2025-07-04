import {OnStart, service} from "./Utils/ServiceRegistry";
import {DataStorage} from "../Classes/DataStorage";


@service({loadOrder: 1})
export class DatastoreService {
    public dataStorageContainer: Map<string, DataStorage<any>> = new Map();

    public getDataStorage<DataType>(name: string, template?: DataType): DataStorage<DataType> {
        if (!this.dataStorageContainer.has(name)) {

            if (template === undefined) {
                throw new Error("datastore not initialized must be, " + name)
            }

            this.dataStorageContainer.set(name, new DataStorage<DataType>(name, template));
        }

        return this.dataStorageContainer.get(name);
    }

    public saveAll() {
        for (const dataStorage of this.dataStorageContainer.values()) {
            dataStorage.save();
        }
    }



    public init() {
        for (const dataStorage of this.dataStorageContainer.values()) {
            dataStorage.retrieve();
            dataStorage.resolve();
        }
    }
}