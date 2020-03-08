import fs = require('fs');
import path = require('path');
 
import glob = require('glob');
import { getLogger } from 'log4js';
import { BootUtilString } from './string';



export class BootUtilIo {
    private static _instance = new BootUtilIo();
    public static get Instance() { return this._instance };

 

    chmodSync(sPath:string, iMode:number) {
        if (iMode == undefined) {
            iMode = 774;
        }
        fs.chmodSync(sPath, iMode);
    }

    upFilePath(sPath:string) {

        return glob.sync(this.pathNormalize(sPath));
    }


    upFileName(sFile:string){
        return path.basename(sFile);
    }

    upBaseName(sFile:string, sExt:string) {
        if (sExt == undefined) {
            sExt = this.upExtName(sFile);
        }

        return path.basename(sFile, sExt);
    }
    upExtName(sFile:string) {
        return path.extname(sFile);
    }


    flagExist(sPath:string) {
        return fs.existsSync(sPath);
    }
    mkdir(dirpath:string, mode?:string) {
        var sFather = path.dirname(dirpath);
        if (!fs.existsSync(sFather)) {
            this.mkdir(sFather, mode);
        }
        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath, mode);
        }

        return true;
    }

    copyFileAsync(sSourcePath:string, sTargetPath:string) {
        this.mkdir(path.dirname(sTargetPath));
        fs.createReadStream(sSourcePath).pipe(fs.createWriteStream(sTargetPath));
    }



    copyDir(src:string,dst:string){
        //this.mkdir(path.dirname(dst));
        let paths = fs.readdirSync(src); //同步读取当前目录
        paths.forEach(function(sPath){
            var _src=path.join(src,sPath)  ;
            var _dst=path.join(dst,sPath);
            fs.stat(_src,function(err,stats){  //stats  该对象 包含文件属性
                if(err)throw err;
                if(stats.isFile()){ //如果是个文件则拷贝 
                    let  readable=fs.createReadStream(_src);//创建读取流
                    BootUtilIo.Instance.mkdir(path.dirname(_dst));
                    let  writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(stats.isDirectory()){ //是目录则 递归 
                     
                    BootUtilIo.Instance.copyDir(_src,_dst);
                }
            });
        });
    }
   


    //查找目录下的所有一级文件夹
    listDirPath(sPath:string):string[]{
        var aList:string[] = [];
        var stat = fs.statSync(sPath);

        if (stat.isDirectory()) {
            fs.readdirSync(sPath).forEach(
                function (file) {
                    if(fs.statSync(path.join(sPath,file)).isDirectory())
                     aList.push(file);
                }
            )
        }
        return aList;
    }

    listDir(sPath:string) {
        var aList = [];


        var stat = fs.statSync(sPath);

        if (stat.isDirectory()) {
            var readDir = fs.readdirSync(sPath);
            fs.readdirSync(sPath).forEach(
                function (file) {
                    var aFiles = BootUtilIo.Instance.listDir(path.join(sPath, file));
                    if (aFiles.length > 0) {
                        aFiles.forEach(
                            function (sName) {
                                aList.push(sName);
                            }
                        );
                        //aList.concat(aFiles);
                    }
                }
            )
        } else {
            aList.push(sPath);
        }

        return aList;

    }
    //根据文件读取配置项
    upConfigByFile(sPath:string) {
        var sContent = this.readFile(sPath);
        return JSON.parse(sContent);
    }
    //将配置写入配置文件
    inFileByConfig(sPath:string, oJson:any) {
        this.writeFile(sPath, JSON.stringify(oJson));
    }


    writeFile(sPath:string, sContent:string) {

        this.mkdir(path.dirname(sPath));
        fs.writeFileSync(sPath, sContent);

    }
    readFile(sPath:string) {
        return fs.readFileSync(sPath, 'UTF-8');
    }
    copyFile(sSource:string, sTarget:string) {
        this.mkdir(path.dirname(sTarget));
        fs.writeFileSync(sTarget, fs.readFileSync(sSource));

    }

    contentIndexOf(sPath:string, sStr:string) {
        var sContent = this.readFile(sPath);
        return sContent.indexOf(sStr);

    }

    contentReplaceWith(sPath:string, sReplace:string, sWith:string) {
        var sContent = this.readFile(sPath);

        //sContent=sContent.replace(sReplace,sWith);
        sContent = BootUtilString.Instance.replaceAll(sContent, sReplace, sWith);
        this.writeFile(sPath, sContent);

    }
    contentReplaceRemove(sPath:string, sStart:string, sEnd:string, sWith:string) {

        var sContent = this.readFile(sPath);

        sContent = BootUtilString.Instance.replaceBetween(sContent, sStart, sEnd, sWith, true);

        this.writeFile(sPath, sContent);
    }

    contentReplaceBetween(sPath:string, sStart:string, sEnd:string, sWith:string) {
        var sContent = this.readFile(sPath);
        var sWrite = BootUtilString.Instance.replaceBetween(sContent, sStart, sEnd, sWith, false);

        this.writeFile(sPath, sWrite);
        return sWrite === sContent;
    }


    insertAfter(sPath:string, sIndex:string, sInsert:string) {
        var sContent = this.readFile(sPath);
        var iIndex = sContent.indexOf(sIndex);
        var sWrite = sContent.substring(0, iIndex + sIndex.length) + sInsert + sContent.substr(iIndex + sIndex.length);
        this.writeFile(sPath, sWrite);
    }
    insertAppend(sPath:string, sInsert:string) {
        var sContent = this.readFile(sPath);

        var sWrite = sContent + sInsert;
        this.writeFile(sPath, sWrite);
    }

    parentPath(sPath:string) {
        return path.dirname(sPath);
    }


    parentTop(sPath: string, iLevel: number) {
        var sReturn = sPath;
        for (var i = 0; i < iLevel; i++) {
            sReturn = this.parentPath(sReturn);
        }
        return sReturn;
    }

    pathJoin(...args:string[]) {

        var sReturn = '';
        args.forEach(function (arg) {
            sReturn = path.join(sReturn, arg);
        });

        return sReturn;
    }
    pathNormalize(sPath:string) {
        return path.normalize(sPath);
    }

    /**
     * 平台的文件路径分隔符，'\\' 或 '/'。
     */
    upPathSeq() {
        return path.sep;
    }

    upRowSeq(){
        return "\n";
    }



};

 

