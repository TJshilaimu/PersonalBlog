var express = require('express');
var app = new express();
let globalConfig = require('./config')

app.use(express.static('./' + globalConfig["page_path"]));
app.listen(12311);