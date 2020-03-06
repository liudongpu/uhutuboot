import { IBootFaceTask } from "../face/task";

export abstract class BootRootTask implements IBootFaceTask{
     
    abstract taskExec():void;

}