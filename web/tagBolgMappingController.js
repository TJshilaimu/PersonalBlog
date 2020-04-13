var tagBlogMappingDao = require('../dao/tagBlogMappingDao');
var path = new Map();
var url =require('url');


function queryBlogByTagId(req,res){
    let params = url.parse(req.url,true).query;
    tagBlogMappingDao.queryBlogByTagId(params.tagId,function(result){
        res.writeHead(200);
        res.end(JSON.stringify(result));
    })
}

path.set('/queryBlogByTagId',queryBlogByTagId);

module.exports.path = path;