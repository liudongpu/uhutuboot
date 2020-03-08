import { getLogger } from "log4js";
import { IBootGuideProjectInfo } from "../face/guide";
import { BootUtilIo } from "../utils/io";



export class BootSuperSync{
    private static _instance = new BootSuperSync();
    public static get Instance() { return this._instance };
    private logger = getLogger(BootSuperSync.name);



    public   start(project:IBootGuideProjectInfo):void{



        this.logger.debug("begin process "+project.projectPath);
        

        let sRootTemplate=BootUtilIo.Instance.pathJoin( BootUtilIo.Instance.parentPath(project.projectPath),"prouhutu");
        



        BootUtilIo.Instance.copyDir(BootUtilIo.Instance.pathJoin(sRootTemplate,"src","uhutu"),BootUtilIo.Instance.pathJoin(project.projectPath,"src","uhutu"),);

        BootUtilIo.Instance.copyDir(BootUtilIo.Instance.pathJoin(sRootTemplate,"src","demo"),BootUtilIo.Instance.pathJoin(project.projectPath,"src","demo"),);

        


    }


}