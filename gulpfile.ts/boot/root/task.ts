import { IBootFaceTask } from "../face/task";

export abstract class BootRootTask implements IBootFaceTask{
    taskStart(cb: Function): void {
        
        this.taskExec();
        cb();
    }

    abstract taskExec():void;

}