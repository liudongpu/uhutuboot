export interface IBootGuideConfig{

    /**
     * 执行命令根目录
     */
    bootCwd:string
    /**
     * 要扫描的项目路径
     */
    bootProjects:IBootGuideProjectInfo[]
    /**
     * 配置文件路径
     */
    bootProjectConfigFile:string

    /**
     * 基准项目仓库地址
     */
    sourceGit:string
    /**
     * 基准项目目录
     */
    sourceDir:string
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


