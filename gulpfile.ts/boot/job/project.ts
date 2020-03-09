import { BootRootTask } from "../root/task";
import { BootGuideConfig } from "../guide/config";

import { getLogger } from 'log4js';
import { BootUtilIo } from "../utils/io";
import { IBootGuideProjectConfig, IBootGuideProjectInfo } from "../face/guide";
import { BootSuperMpass } from "../super/mpass";
import { BootSuperSync } from "../super/sync";
import { BootSuperReact } from "../super/react";

export class BootJobProject extends BootRootTask{
    taskExec(): void {
        
        let oConfig=BootGuideConfig.Instance.upConfig();

        oConfig.bootProjects.forEach(fItem=>{
            
            this.refreshProject(fItem);
        })



    }



    refreshProject(project:IBootGuideProjectInfo){


         if(project.projectConfig.flagEnablePro){
            BootSuperSync.Instance.start(project);
         }

        

        if(project.projectConfig.flagEnableMpass){

            BootSuperMpass.Instance.start(project);
        }


        if(project.projectConfig.flagEnableReactNative){

            BootSuperReact.Instance.start(project);
        }


    }


    private static _instance = new BootJobProject();
    public static get Instance() { return this._instance };
    private logger = getLogger(BootJobProject.name);


}