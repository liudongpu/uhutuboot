import { getLogger } from "log4js";
import { IBootGuideProjectInfo } from "../face/guide";
import { BootUtilIo } from "../utils/io";
import { BootUtilString } from "../utils/string";
import { BootHelperFile } from "../helpers/file";
import { BootUtilSpawn } from "../utils/spawn";


export class BootSuperMpass{
    private static _instance = new BootSuperMpass();
    public static get Instance() { return this._instance };
    private logger = getLogger(BootSuperMpass.name);



    public   start(project:IBootGuideProjectInfo):void{


        this.installIos(project);
         


    }



    private installIos(project:IBootGuideProjectInfo){


        let sPathIos=BootUtilIo.Instance.pathJoin(project.projectPath,"ios");

        let sPodFile=BootUtilIo.Instance.pathJoin(sPathIos,"Podfile");


        BootHelperFile.Instance.fileContentProcess(sPodFile,"#","source",["source \"https://github.com/CocoaPods/Specs.git\" "],"platform.*?:ios.*?$")

         

        if(BootUtilIo.Instance.readFile(sPodFile).indexOf("mPaaS_baseline")===-1){
            



            BootHelperFile.Instance.fileContentProcess(sPodFile,"#","mpass",['  mPaaS_pod "mPaaS_TinyApp"'],"use_native_modules\!$")

            BootUtilSpawn.Instance.spawnSync("pod",["mpaas","init"],{cwd:sPathIos});
            let sContent=BootUtilIo.Instance.readFile(sPodFile);
            sContent=sContent.replace("mPaaS_baseline 'x.x.x'","mPaaS_baseline '10.1.60'");
            BootUtilIo.Instance.writeFile(sPodFile,sContent);
            BootUtilSpawn.Instance.spawnSync("pod",["install"],{cwd:sPathIos});


        }


        

        

    }









}
