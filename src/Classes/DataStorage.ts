import {ENCRYPTION_KEY, SAVE_FILE_FORMAT} from "../Utils/Constantes";
import {parser} from "../Utils/Parser";
import {deepCopy, error, fromBase64, printTable, toBase64, xorEncrypt} from "../Utils/Functions";


export class DataStorage<DataType> {
    private readonly name: string;
    private readonly filePath: string
    private readonly template: DataType;
    private data: DataType;

    constructor(name: string, template: DataType) {
        this.name = name + SAVE_FILE_FORMAT;
        this.template = template;
    }

    public save() {
       const stringifyData: string = parser.stringify(this.data);
       const encryptedData: string = xorEncrypt(stringifyData, ENCRYPTION_KEY);
       const base64 = toBase64(encryptedData);

      const [success, msg] = love.filesystem.write(this.name, base64)

      print("success: data has been successfully saved: ", this.name)
      print(this.toString())

        if (!success) {
            error(msg)
        }
    }

    public resolve() {
        this.data = {...this.template, ...this.data}
    }

    public retrieve() {
        if (!love.filesystem.getInfo(this.name)) {
            this.data = deepCopy(this.template);
            print("file not found: ", this.name);
            return;
        }

        const [content, size] = love.filesystem.read(this.name)
        const base64 = fromBase64(content);
        const decrypted = xorEncrypt(base64, ENCRYPTION_KEY);


        this.data = parser.parse(decrypted);
    }

    public getData(): DataType {
        return this.data;
    }

    public set<K extends keyof DataType>(field: K, value: DataType[K]) {
        this.data[field] = value;
    }

    public get<K extends keyof DataType>(field: K): DataType[K] {
        return this.data[field];
    }

    //reset the data to the template one;
    public clear() {
        this.data = deepCopy(this.template);
    }

    public toString(): string {
        return printTable(this.data)
    }
}