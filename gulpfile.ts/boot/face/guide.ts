export interface IBootGuideConfig{
    bootCwd:string
    bootProjects:IBootGuideProjectInfo[]
    bootProjectConfigFile:string
}



/**
 * 项目的配置
 */
export interface IBootGuideProjectInfo{

    //配置文件路径地址
    configFilePath:string

    projectPath:string

    projectConfig:IBootGuideProjectConfig

}


export interface IBootGuideProjectConfig{

    /**
     * 是否启用mpass平台
     */
    flagEnableMpass:boolean


    /**
     * 使用启用prouhutu
     */
    flagEnablePro:boolean

    /**
     * 定义是否启动ReactNative
     */
    flagEnableReactNative:boolean



    projectName:string
}


