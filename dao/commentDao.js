var dbunite = require('./dbunite');


function insertComment(name,content,ctime,utime,bid,parent,email,parentName,success){
    var insertMql = "insert into comments (user_name,content,ctime,utime,blog_id,parent,email,parent_name) values (?,?,?,?,?,?,?,?)";
    var params = [name,content,ctime,utime,bid,parent,email,parentName];
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


function queryCommentByBid(bid,success){
    var insertMql = "select * from comments where blog_id = ?;";
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


function queryCommentByCount(success){
    var insertMql = "select count(1) as count from comments;";
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

function queryCommentByCtime(success){
    var insertMql = "select * from comments order by ctime desc limit 5;";
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
module.exports.queryCommentByCtime=queryCommentByCtime;


module.exports.queryCommentByCount=queryCommentByCount;


module.exports.queryCommentByBid=queryCommentByBid;


module.exports.insertComment=insertComment;
