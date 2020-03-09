import { BootUtilIo } from "../utils/io";
import { IBootGuideProjectInfo } from "../face/guide";
import { BootUtilSpawn } from "../utils/spawn";
import { getLogger } from "log4js";
import plist from "plist";
import fs from "fs";

export interface IBootHelperIosProject{
    iosPath:string,
    podFile:string,
    workName:string
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
        let sWorkName="";

        fs.readdirSync(sPathIos).forEach(fItem=>{

             
            if(fItem.endsWith(".xcodeproj")){
                sWorkName=fItem.substr(0,fItem.length-".xcodeproj".length);
            }
        });

        return {
            iosPath:sPathIos,
            podFile:sPodFile,
            workName:sWorkName
        }
    }


    public podInstall(iosProject:IBootHelperIosProject){

        //BootUtilSpawn.Instance.spawnSync("pod",["install"],{cwd:iosProject.iosPath});
        
    }





    public updatePlist(iosProject:IBootHelperIosProject,sKey:string,oValue:any){


       
        let sPlistFile=BootUtilIo.Instance.pathJoin(iosProject.iosPath,iosProject.workName,"info.plist");

        let sSource=BootUtilIo.Instance.readFile(sPlistFile);

        let oPlist:any=plist.parse(sSource);
        
         
        

        if(oPlist[sKey]===undefined||oPlist[sKey]!==oValue){
            oPlist[sKey]=oValue;

        }


        let sNewInfo=plist.build(oPlist);
        if(sSource!=sNewInfo){
            BootUtilIo.Instance.writeFile(sPlistFile,sNewInfo);
        }
       
         

        
    }
     



}