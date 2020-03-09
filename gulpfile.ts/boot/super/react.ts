import { getLogger } from "log4js";
import { IBootGuideProjectInfo } from "../face/guide";
import { BootUtilIo } from "../utils/io";
import { BootUtilString } from "../utils/string";
import { BootHelperFile } from "../helpers/file";
import { BootUtilSpawn } from "../utils/spawn";
import { BootHelperIos } from "../helpers/ios";


export class BootSuperReact{
    private static _instance = new BootSuperReact();
    public static get Instance() { return this._instance };
    private logger = getLogger(BootSuperReact.name);



    public   start(project:IBootGuideProjectInfo):void{


        this.installIos(project);
         


    }



    private installIos(project:IBootGuideProjectInfo){


        let oIosProject=BootHelperIos.Instance.upIosProject(project);

        this.logger.debug("installIos",oIosProject);

        /*
        BootHelperFile.Instance.fileContentProcess(sPodFile,"#","source",["source \"https://github.com/CocoaPods/Specs.git\" "],"platform.*?:ios.*?$")

         

        if(BootUtilIo.Instance.readFile(sPodFile).indexOf("mPaaS_baseline")===-1){
            



            BootHelperFile.Instance.fileContentProcess(sPodFile,"#","mpass",['  mPaaS_pod "mPaaS_TinyApp"'],"use_native_modules\!$")

            BootUtilSpawn.Instance.spawnSync("pod",["mpaas","init"],{cwd:sPathIos});
            let sContent=BootUtilIo.Instance.readFile(sPodFile);
            sContent=sContent.replace("mPaaS_baseline 'x.x.x'","mPaaS_baseline '10.1.60'");
            BootUtilIo.Instance.writeFile(sPodFile,sContent);
            BootUtilSpawn.Instance.spawnSync("pod",["install"],{cwd:sPathIos});


        }
        */

        let sPodInfo=`
        pod 'FBLazyVector', :path => "../node_modules/react-native/Libraries/FBLazyVector"
        pod 'FBReactNativeSpec', :path => "../node_modules/react-native/Libraries/FBReactNativeSpec"
        pod 'RCTRequired', :path => "../node_modules/react-native/Libraries/RCTRequired"
        pod 'RCTTypeSafety', :path => "../node_modules/react-native/Libraries/TypeSafety"
        pod 'React', :path => '../node_modules/react-native/'
        pod 'React-Core', :path => '../node_modules/react-native/'
        pod 'React-CoreModules', :path => '../node_modules/react-native/React/CoreModules'
        pod 'React-Core/DevSupport', :path => '../node_modules/react-native/'
        pod 'React-RCTActionSheet', :path => '../node_modules/react-native/Libraries/ActionSheetIOS'
        pod 'React-RCTAnimation', :path => '../node_modules/react-native/Libraries/NativeAnimation'
        pod 'React-RCTBlob', :path => '../node_modules/react-native/Libraries/Blob'
        pod 'React-RCTImage', :path => '../node_modules/react-native/Libraries/Image'
        pod 'React-RCTLinking', :path => '../node_modules/react-native/Libraries/LinkingIOS'
        pod 'React-RCTNetwork', :path => '../node_modules/react-native/Libraries/Network'
        pod 'React-RCTSettings', :path => '../node_modules/react-native/Libraries/Settings'
        pod 'React-RCTText', :path => '../node_modules/react-native/Libraries/Text'
        pod 'React-RCTVibration', :path => '../node_modules/react-native/Libraries/Vibration'
        pod 'React-Core/RCTWebSocket', :path => '../node_modules/react-native/'
      
        pod 'React-cxxreact', :path => '../node_modules/react-native/ReactCommon/cxxreact'
        pod 'React-jsi', :path => '../node_modules/react-native/ReactCommon/jsi'
        pod 'React-jsiexecutor', :path => '../node_modules/react-native/ReactCommon/jsiexecutor'
        pod 'React-jsinspector', :path => '../node_modules/react-native/ReactCommon/jsinspector'
        pod 'ReactCommon/jscallinvoker', :path => "../node_modules/react-native/ReactCommon"
        pod 'ReactCommon/turbomodule/core', :path => "../node_modules/react-native/ReactCommon"
        pod 'Yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
      
        pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
        pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
        pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

        `;


        BootHelperFile.Instance.fileContentProcess(oIosProject.podFile,"#","rnpod",[sPodInfo],"use_frameworks\\!$")

         


        BootHelperIos.Instance.podInstall(oIosProject);

    }









}
