var fs = require('fs');
var globalConfig = require('./config.js');

var files = fs.readdirSync('./' + globalConfig["web_path"]);

var pathMap = new Map();
for( let i = 0 ; i< files.length ;i ++){
    var file = require('./' + globalConfig["web_path"] +'/' +files[i])
    if(file.path){   
        for( var [key,value] of file.path){
            if(pathMap.get(key) == null){
                pathMap.set(key,value);
            }else{
                throw new Error('url地址出错，url异常');
            }
        }
    }
}

module.exports = pathMap;