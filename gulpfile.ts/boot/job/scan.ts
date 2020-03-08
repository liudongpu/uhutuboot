import { BootRootTask } from "../root/task";
import { BootGuideConfig } from "../guide/config";

import { getLogger } from 'log4js';
import { BootUtilIo } from "../utils/io";
import { IBootGuideProjectConfig, IBootGuideProjectInfo } from "../face/guide";

export class BootJobScan extends BootRootTask{
    

    private static _instance = new BootJobScan();
    public static get Instance() { return this._instance };
    private logger = getLogger(BootJobScan.name);

    taskExec(): void {

        BootGuideConfig.Instance.initConfig();

        this.showdir();
    }



    /**
     * 扫描文件夹结构
     */
    private  showdir():void{

        let oConfig=BootGuideConfig.Instance.upConfig();

        let sParentDir=BootUtilIo.Instance.parentPath(oConfig.bootCwd);
        let aDir= BootUtilIo.Instance.listDirPath(sParentDir);
        aDir.forEach(fItem=>{

            let sPath=BootUtilIo.Instance.pathJoin(sParentDir,fItem,oConfig.bootProjectConfigFile);

            if(BootUtilIo.Instance.flagExist(sPath)){

                let oProjectConfig:IBootGuideProjectConfig={

                    flagEnableMpass:false
                };


                let oProjectInfo:IBootGuideProjectInfo={
                    configFilePath:sPath,
                    projectPath:BootUtilIo.Instance.parentPath(sPath),
                    projectConfig:oProjectConfig
                }


                oConfig.bootProjects.push(oProjectInfo);
            }


        });


        
         this.logger.debug(JSON.stringify(oConfig,null,"  "));

         
    }







    

}