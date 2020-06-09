var dbunite = require('./dbunite');
function insertTagBlogMapping(tag_id,blog_id,ctime,utime,success){
    var insertMql = "insert into tag_blog_mapping (tag_id,blog_id,ctime,utime) values (?,?,?,?)";
    var params = [tag_id,blog_id,ctime,utime];
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

function queryBlogByTagId(tagId,success){
    var insertMql = "select blog_id from tag_blog_mapping where tag_id = ?;";
    var params = [tagId];
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



module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryBlogByTagId = queryBlogByTagId;
