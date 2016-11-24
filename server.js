var express = require('express');
var app = express();
app.use(express.static('public'));
var port = process.env.PORT | 3000;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html?version='+new Date());
});
app.listen(port, function (res) {
    console.log("start server : http://localhost:", port);
})
