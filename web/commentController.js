/*
 * @Author: your name
 * @Date: 2020-06-10 17:03:10
 * @LastEditTime: 2020-08-19 14:11:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \personalBlog\web\commentController.js
 */
var path = new Map();
var commentDao = require('../dao/commentDao');
const url = require('url');
var captcha = require('svg-captcha');
var uniteTime = require('../page/unite/uniteTime')

function insertComment(req, res) {
    var params = url.parse(req.url, true).query;
    commentDao.insertComment(params.name, params.comment, uniteTime(), 2021, params.bid, params.parent, params.email, params.parentName, function (result) {
        res.writeHead(200);
        res.write("oookkkk");
        res.end();
    })
}

function queryRandomCode(req, res) {
    var img = captcha.create({
        fontSize: 34,
        width: 150,
        height: 100,
        marginTop: 20,

    });
    
    res.writeHead(200);
    res.write(JSON.stringify(img));
    res.end();
}

path.set('/queryRandomCode', queryRandomCode);


function queryCommentByBid(req, res) {
    var params = url.parse(req.url, true).query;
    commentDao.queryCommentByBid(params.bid, function (result) {
        res.writeHead(200);
        res.write(JSON.stringify(result));
        res.end();
    })
}

function queryCommentByCount(req, res) {
    commentDao.queryCommentByCount(function (result) {
        res.writeHead(200);
        res.write(JSON.stringify(result));
        res.end();
    })
}

function queryCommentByCtime(req,res){
    commentDao.queryCommentByCtime(function(result){
        res.writeHead(200);
        res.end(JSON.stringify(result));
    })
}



path.set('/queryCommentByCtime', queryCommentByCtime);


path.set('/queryCommentByCount', queryCommentByCount);
path.set('/queryCommentByBid', queryCommentByBid);

path.set('/insertComment', insertComment);


module.exports.path = path;