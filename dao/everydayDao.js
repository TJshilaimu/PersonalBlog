var dbunite = require('./dbunite');

function insertEveryday(content,ctime,success){
    var insertMql = "insert into everyday (content,ctime) values (?,?)";
    var params = [content,ctime];

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

function selectEveryday(success){
    var insertMql = "select * from everyday order by id desc;";
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


module.exports.insertEveryday = insertEveryday;
module.exports.selectEveryday = selectEveryday;