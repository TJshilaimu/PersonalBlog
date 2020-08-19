var dbunite = require('./dbunite');

function insertBlog(title,content,views,tags,ctime,utime,success){
    var insertMql = "insert into blog (title,content,views,tags,ctime,utime) values (?,?,?,?,?,?)";
    var params = [title,content,views,tags,ctime,utime];
    var connection = dbunite.createConnection();
    connection.connect();
    connection.query(insertMql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end()
}

function queryBlogById(id,success){
    var insertMql = "select * from blog where id = ?;";
    var params = [id];
    var connection = dbunite.createConnection();
    connection.connect();
    connection.query(insertMql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end()
}

function queryBlogByPage(page,pageSize,success){
    var insertMql = "select * from blog order by id desc limit ?,?;";
    var params = [page,pageSize];
    var connection = dbunite.createConnection();
    connection.connect();
    connection.query(insertMql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end()
}


function queryBlogByCount(success){
    var insertMql = "select count(1) as count from blog order by id desc ;";
    var params = [];
    var connection = dbunite.createConnection();
    connection.connect();
    connection.query(insertMql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end()
}

function addViews(bid,success){
    var insertMql = "update blog set views = views+1 where id = ?;";
    var params = [bid];
    var connection = dbunite.createConnection();
    connection.connect();
    connection.query(insertMql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end()
}

function queryBlogByViews(size,success){
    var insertMql = "select * from blog order by views desc limit ?;";
    var params = [size];
    var connection = dbunite.createConnection();
    connection.connect();
    connection.query(insertMql,params,function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end()
}

function queryBlogBySearch(search, success) {
    var sql = "select * from blog where title like concat('%',?,'%') or content like concat('%',?,'%');"
    var params = [search,search];
    var connection = dbunite.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            // console.log(result)
            success(result);
        }
    });
    connection.end();
}

function queryBlogBySearchCount(search, success) {
    var sql = "select count(1) as count from blog where title like concat('%',?,'%') or content like concat('%',?,'%');";
    var params = [search, search];
    var connection = dbunite.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(1,error);
        } else {
            success(result);
        }
    });
    connection.end();
}




module.exports.queryBlogByViews= queryBlogByViews;
module.exports.addViews= addViews;
module.exports.insertBlog= insertBlog;
module.exports.queryBlogById= queryBlogById;
module.exports.queryBlogByPage= queryBlogByPage;
module.exports.queryBlogByCount= queryBlogByCount;
module.exports.queryBlogBySearch = queryBlogBySearch;
module.exports.queryBlogBySearchCount = queryBlogBySearchCount;