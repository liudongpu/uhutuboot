
 
import { BootJobScan } from '../job/scan';


export class BootLoadTask {

    private static _instance = new BootLoadTask();
    public static get Instance() { return this._instance };


    //扫描文件夹结构
    taskScan(cb: Function): void {
        
        BootJobScan.Instance.taskExec();
        cb();
    }


 



}
