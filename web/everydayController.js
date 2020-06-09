var path = new Map();
var everydayDao = require('../dao/everydayDao');
const url = require('url');
let uniteResp = require('../page/unite/respUnite');
let getTime = require('../page/unite/uniteTime');

function insertEveryday(req, res) {
    var params = url.parse(req.url,true).query;
    everydayDao.insertEveryday(params.content,2020,function(result){
        res.writeHead(200);
        // res.write(uniteResp('success','添加成功',result));
        res.write(uniteResp('success','添加成功',null))
        res.end();
    })
}
path.set('/insertEveryday',insertEveryday);


function selectEveryday(req, res) {
    everydayDao.selectEveryday(function(result){
        res.writeHead(200);
        res.write(uniteResp('success','查询成功',result))
        res.end();
    })
}
path.set('/selectEveryday',selectEveryday);



module.exports.path = path;