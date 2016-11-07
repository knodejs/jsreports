var express = require('express');
var app = express();
app.use(express.static('public'));
var port = process.env.PORT | 3000;
app.listen(port, function (res) {
    console.log("start server : http://localhost:", port);
})