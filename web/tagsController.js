var path = new Map();
let tagsDao = require('../dao/tagsDao')

function queryAllTags(req,res){
    tagsDao.queryAllTags(function(result){
        res.writeHead(200);
        res.write(JSON.stringify(result));
        res.end();
    })
}

path.set('/queryAllTags',queryAllTags);

module.exports.path = path;