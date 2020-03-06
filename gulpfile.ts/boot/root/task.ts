import { IBootRootTask } from "../face/root";

export abstract class BootRootTask implements IBootRootTask{
     
    abstract taskExec():void;

}