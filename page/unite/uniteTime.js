function getTime(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var time = date.toLocaleTimeString();
    console.log(time)
    var time1 = date.toLocaleDateString();
    
    console.log(time1)
     return time1 +' '+ time;
}

module.exports = getTime;
// getTime();