import {InputPriorityOrder, Keys, KEYS_CODE} from "../Utils/Constantes";
import {KeyConstant} from "love.keyboard";



export interface InputConfig {
    defaultName: string;
    defaultKey: KeyConstant;                                    // or more narrowly: keyof typeof KEYS_CODE
    defaultPriorityOrder: InputPriorityOrder;
    defaultCallback: (gameProcess: boolean) => void;
}