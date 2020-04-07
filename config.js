// 对配置文件进行解析
var fs = require('fs');

var files= fs.readFileSync('./server.conf');
var temp = files.toString().split('\n');
let globalConfig = {};
for(let i = 0 ; i< temp.length; i++){
    globalConfig[temp[i].split('=')[0]] = temp[i].split('=')[1].trim();
}
module.exports = globalConfig;