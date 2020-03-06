import { getLogger } from "log4js";


export class BootSuperMpass{
    private static _instance = new BootSuperMpass();
    public static get Instance() { return this._instance };
    private logger = getLogger(BootSuperMpass.name);


    


}
