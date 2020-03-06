import { getLogger } from "log4js";
import { IBootGuideProjectInfo } from "../face/guide";
import { BootUtilIo } from "../utils/io";
import { BootUtilString } from "../utils/string";
import { BootHelperFile } from "../helpers/file";


export class BootSuperMpass{
    private static _instance = new BootSuperMpass();
    public static get Instance() { return this._instance };
    private logger = getLogger(BootSuperMpass.name);



    public   start(project:IBootGuideProjectInfo):void{


        this.installIos(project);
         


    }



    private installIos(project:IBootGuideProjectInfo){

        let sPodFile=BootUtilIo.Instance.pathJoin(project.projectPath,"ios","Podfile");


        BootHelperFile.Instance.fileContentProcess(sPodFile,"#","source",["source \"https://github.com/CocoaPods/Specs.git\" "],"platform.*?:ios.*?$")

          

    }









}
