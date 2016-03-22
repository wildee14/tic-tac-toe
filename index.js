var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var num = 0;


io.on('connection', function(socket) {

  num = num + 1;
  var numintime = num;

  socket.on('play', function(data) {
    console.log(numintime + " " + data.squareId);
  });
});
