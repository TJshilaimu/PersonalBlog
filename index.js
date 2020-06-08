var express = require('express');
var app = new express();
var globalConfig = require('./config');
let loader = require('./loader');var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
app.use(express.static('./' + globalConfig["page_path"]));
app.listen(12312);
app.get('/insertEveryday',loader.get('/insertEveryday'));
app.get('/selectEveryday',loader.get('/selectEveryday')); 
app.post('/insertBlog',jsonParser,loader.get('/insertBlog'));
app.get('/queryBlogByPage',loader.get('/queryBlogByPage'));
app.get('/queryBlogByCount',loader.get('/queryBlogByCount'));
app.get('/queryBlogById',loader.get('/queryBlogById'));

app.get('/insertComment',loader.get('/insertComment'));

app.get('/queryRandomCode',loader.get('/queryRandomCode'));
app.get('/queryCommentByBid',loader.get('/queryCommentByBid'));

app.get('/queryCommentByCount',loader.get('/queryCommentByCount'));

app.get('/queryAllTags',loader.get('/queryAllTags'));

app.get('/queryBlogByTagId',loader.get('/queryBlogByTagId'));

app.get('/queryBlogByTag',loader.get('/queryBlogByTag'));

app.get('/queryBlogByViews',loader.get('/queryBlogByViews'));

app.get('/queryCommentByCtime',loader.get('/queryCommentByCtime'));









