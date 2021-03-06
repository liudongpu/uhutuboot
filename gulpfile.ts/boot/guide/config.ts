
import { configure, getLogger, levels } from 'log4js';
import { IBootGuideConfig } from '../face/guide';

 
let oConfig:IBootGuideConfig={
    bootCwd:"",
    bootProjects:[],
    bootProjectConfigFile:"uhutuboot-project.json",
    sourceDir:"",
    sourceGit:""

}


export class BootGuideConfig{
    

    private static _instance = new BootGuideConfig();
    public static get Instance() { return this._instance };
    private logger = getLogger(BootGuideConfig.name);


    upConfig(){
        return oConfig;
    }




    /**
     * 初始化配置信息
     */
    initConfig(){

        //配置日志
        configure({
            appenders: { cheese: { type: 'file', filename: 'cheese.log' },out:{
                
                type:"stdout"}},
            disableClustering:false,
            categories: { default: { appenders: ['cheese','out'], level: 'debug' } }
        });



        //设置变量


        oConfig.bootCwd=process.cwd();



        this.logger.debug("current config:",oConfig);


    }

 
    

}