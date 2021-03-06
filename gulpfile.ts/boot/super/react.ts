import { getLogger } from "log4js";
import { IBootGuideProjectInfo } from "../face/guide";
import { BootUtilIo } from "../utils/io";
import { BootUtilString } from "../utils/string";
import { BootHelperFile } from "../helpers/file";
import { BootUtilSpawn } from "../utils/spawn";
import { BootHelperIos } from "../helpers/ios";
import { BootHelperAndroid } from "../helpers/android";


export class BootSuperReact{
    private static _instance = new BootSuperReact();
    public static get Instance() { return this._instance };
    private logger = getLogger(BootSuperReact.name);



    public   start(project:IBootGuideProjectInfo):void{


        this.installIos(project);
 
        this.installAndroid(project);
         


    }



    private installAndroid(project:IBootGuideProjectInfo){

        let oAndroidProject=BootHelperAndroid.Instance.upAndroidProject(project);
        this.logger.debug("installAndroid",oAndroidProject);


BootHelperFile.Instance.fileContentProcess(oAndroidProject.appGradle,"//","rn_imptool",['      implementation "com.facebook.react:react-native:+"'],"dependencies\\s\\{$")


let sMavenSource='maven {url "$rootDir/../node_modules/react-native/android"}';

BootHelperFile.Instance.fileContentProcess(oAndroidProject.androidGradle,"//","rn_url",[sMavenSource],"allprojects\\s+\\{\\n.*?repositories\\s+\\{")

        
    }


     



    private installIos(project:IBootGuideProjectInfo){


        let oIosProject=BootHelperIos.Instance.upIosProject(project);

        this.logger.debug("installIos",oIosProject);

        
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



        BootHelperIos.Instance.updatePlist(oIosProject,"UIViewControllerBasedStatusBarAppearance",false);

    }









}
