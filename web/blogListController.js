var path = new Map();
var blogDao = require('../dao/blogDao');
let tagsDao = require('../dao/tagsDao');
var uniteTime = require('../page/unite/uniteTime');
let insertTagBlogMappingDao = require('../dao/tagBlogMappingDao');
var url = require('url');

function insertBlog(req, res) {
    // console.log(req.body)
    // req.on("data", function (data) {
    // var data = JSON.parse(data.toString());
    blogDao.insertBlog(req.body.title, req.body.content, 12, req.body.tags, uniteTime(), 2021, function (result) {
        res.writeHead(200);
        res.write('ok');
        res.end();
        var tagArr = req.body.tags.split(',');
        var blog_id = result.insertId;
        for (var i = 0; i < tagArr.length; i++) {
            if (tagArr[i] == '') {
                continue;
            }
            queryTags(tagArr[i], blog_id)
        }
    })
    // })
}

function queryTags(tag, blog_id) {
    tagsDao.queryTags(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blog_id);
        } else {
            insertTagBlogMappingDao.insertTagBlogMapping(result[0].id, blog_id, uniteTime(), 2020, function (result) {});
        }
    })
}

function insertTag(tag, blog_id) {
    tagsDao.insertTags(tag, uniteTime(), function (result) {
        insertTagBlogMapping(result.insertId, blog_id);
    })
}

function insertTagBlogMapping(tag_id, blog_id) {
    insertTagBlogMappingDao.insertTagBlogMapping(tag_id, blog_id, uniteTime(), 2020, function (result) {});
}




function queryBlogByPage(req, res) {
    var params = url.parse(req.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (var i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<img src="data:image\/png;[\w\W]+>/g, "");
            // result[i].content = result[i].content.replace(/<\/?[a-zA-Z]+(\s+[a-zA-Z]+=".*")*>/g, "");<[^>]+>
            result[i].content = result[i].content.replace(/<[^>]+>/g, "")
            if (result[i].content.length > 300) {
                result[i].content = result[i].content.substr(0, 300);
            }
        }
        res.writeHead(200);
        res.write(JSON.stringify(result));
        res.end();
    })
}

function queryBlogByCount(req, res) {
    blogDao.queryBlogByCount(function (result) {
        res.writeHead(200);
        res.write(JSON.stringify(result));
        res.end();
    })
}

function queryBlogById(req, res) {
    var params = url.parse(req.url, true).query;
    blogDao.queryBlogById(params.id, function (result) {
        res.writeHead(200);
        res.write(JSON.stringify(result));
        res.end();
        blogDao.addViews(params.id,function(result){});
    })
}

function queryBlogByTag(req, res) {
    var params = url.parse(req.url, true).query;
    tagsDao.queryTags(params.tag, function (result) {
        let tagId = result[0].id;
        insertTagBlogMappingDao.queryBlogByTagId(tagId, function (result) {
            let blogList = [];
            for (var i = 0; i < result.length; i++) {
                blogDao.queryBlogById(result[i].blog_id, function (result1) {
                    result1[0].content = result1[0].content.replace(/<img src="data:image\/png;[\w\W]+>/g, "");
                    result1[0].content = result1[0].content.replace(/<[^>]+>/g, "")
                    blogList.push(result1);
                })
            }


          
            setTimeout(function () {
                res.writeHead(200);
                res.end(JSON.stringify(blogList));
            }, 200)

        })
    })
}

function getResult(result) {
    var blogList = [];
    for (var i = 0; i < result.length; i++) {
        blogDao.queryBlogById(result[i].blog_id, function (result1) {

            blogList.push(result1);
            console.log(blogList, '+++++')
        })
    }
    return blogList
}

function queryBlogByViews(req,res){
    blogDao.queryBlogByViews(5,function(result){
        res.writeHead(200);
        res.end(JSON.stringify(result));
    })
}


function queryBlogBySearch(req,res){
    var params = url.parse(req.url,true).query;
    blogDao.queryBlogBySearch(params.Search, function (result) {
        blogDao.queryBlogBySearchCount(params.Search, function (count) {
            console.log(count)
            res.writeHead(200);
            res.end(JSON.stringify({count: count, list: result}));
        });
    });
}

path.set('/queryBlogBySearch',queryBlogBySearch)
path.set('/queryBlogByViews', queryBlogByViews);
path.set('/queryBlogByTag', queryBlogByTag);
path.set('/queryBlogById', queryBlogById);
path.set('/queryBlogByCount', queryBlogByCount);
path.set('/queryBlogByPage', queryBlogByPage);
path.set('/insertBlog', insertBlog);




module.exports.path = path;