import { getLogger } from "log4js";
import { IBootBaseCommandType } from "../face/base";
import { BootUtilIo } from "../utils/io";
import { BootUtilString } from "../utils/string";


export class BootHelperFile{
    private static _instance = new BootHelperFile();
    public static get Instance() { return this._instance };
    private logger = getLogger(BootHelperFile.name);


    private commandAutoNameBegin:string="uhutuboot-auto-begin-"
    private commandAutoNameEnd:string="uhutuboot-auto-end-"




    public fileContentProcess(sFileName:string,commandType:IBootBaseCommandType,sName:string,aInfo:string[],sAfter:string){


        let oContent=BootUtilIo.Instance.readFile(sFileName);

        let sNewInfo=BootUtilString.Instance.reaplaceBig(oContent,
            
            BootUtilIo.Instance.upRowSeq()+commandType.toString()+this.commandAutoNameBegin+sName,
            BootUtilIo.Instance.upRowSeq()+commandType.toString()+this.commandAutoNameEnd+sName,
            BootUtilIo.Instance.upRowSeq()+aInfo.join(BootUtilIo.Instance.upRowSeq())
        
        ,sAfter);
        this.logger.debug(sNewInfo);
        //BootUtilIo.Instance.writeFile(sFileName,sNewInfo);

    }



}