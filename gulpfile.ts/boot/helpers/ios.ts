import { BootUtilIo } from "../utils/io";
import { IBootGuideProjectInfo } from "../face/guide";
import { BootUtilSpawn } from "../utils/spawn";
import { getLogger } from "log4js";



export interface IBootHelperIosProject{
    iosPath:string,
    podFile:string
}


export class BootHelperIos{
    private static _instance = new BootHelperIos();
    public static get Instance() { return this._instance };
     
    private logger = getLogger(BootHelperIos.name);


    public upIosProject(project:IBootGuideProjectInfo):IBootHelperIosProject{
        let sPathIos=BootUtilIo.Instance.pathJoin(project.projectPath,"ios");

        let sPodFile=BootUtilIo.Instance.pathJoin(sPathIos,"Podfile");

        if(!BootUtilIo.Instance.flagExist(sPodFile)){
            this.logger.debug("init pod file");
            BootUtilSpawn.Instance.spawnSync("pod",["init"],{cwd:sPathIos});

            
        }

        return {
            iosPath:sPathIos,
            podFile:sPodFile
        }
    }


    public podInstall(iosProject:IBootHelperIosProject){

        BootUtilSpawn.Instance.spawnSync("pod",["install"],{cwd:iosProject.iosPath});
    }


     



}