var dbunite = require('./dbunite');

function insertTags(tag,ctime,success){
    var insertMql = "insert into tags (tag,ctime) values (?,?)";
    var params = [tag,ctime];
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

function queryTags(tag,success){
    var insertMql = "select * from tags where tag = ? ";
    var params = [tag];
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

function queryAllTags(success){
    var insertMql = "select id,tag from tags;";
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

module.exports.queryAllTags = queryAllTags;

module.exports.insertTags = insertTags;
module.exports.queryTags = queryTags;