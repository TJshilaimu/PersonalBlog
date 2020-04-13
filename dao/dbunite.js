var mysql = require('mysql');
var createConnection = function(){
   var connection =  mysql.createConnection({
        port:'3306',
        host:'127.0.0.1',
        user:'root',
        password:'panda123',
        database:'my_blog'
    });
    return connection;
}
module.exports.createConnection = createConnection;