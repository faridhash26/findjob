var express = require('express');
var app = express();




//midlewares 
require('./midlewares')(app);




// routes
require('./routes')(app);



module.exports = app;
