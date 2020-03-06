import { BootRootTask } from "../root/task";


export class BootJobScan extends BootRootTask{
    

    private static _instance = new BootJobScan();
    public static get Instance() { return this._instance };


    taskExec(): void {
        this.showdir();
    }



    private  showdir():void{
console.log("aa")
    }

    

}