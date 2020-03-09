import { BootUtilIo } from "../utils/io";
import { IBootGuideProjectInfo } from "../face/guide";
import { BootUtilSpawn } from "../utils/spawn";
import { getLogger } from "log4js";
import plist from "plist";
import fs from "fs";

export interface IBootHelperAndroidProject{
    workPath:string,
    androidGradle:string,
    appGradle:string,
    workName:string
}


export class BootHelperAndroid{
    private static _instance = new BootHelperAndroid();
    public static get Instance() { return this._instance };
     
    private logger = getLogger(BootHelperAndroid.name);


    public upAndroidProject(project:IBootGuideProjectInfo):IBootHelperAndroidProject{
        let sPathIos=BootUtilIo.Instance.pathJoin(project.projectPath,"android");

        
         
        return {
            workPath:sPathIos,
            workName:"android",
            androidGradle:BootUtilIo.Instance.pathJoin(sPathIos,"build.gradle"),
            appGradle:BootUtilIo.Instance.pathJoin(sPathIos,"app","build.gradle")
        }
    }

 


}