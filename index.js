var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Board = require('./board.js');

server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile('/home/k/kmdice/tic-tac-toe' + '/index.html');
});

var player_num = 0;
var game_num = 0;
var playerQueue = [];
var freeDisplayBoards = [];

var canStartGame = function(){
  return freeDisplayBoards.length > 0 && playerQueue.length > 1;
}

var startGame = function(){
  var gid = String(game_num);
  game_num++;
  var p1 = playerQueue.shift();
  var p2 = playerQueue.shift();
  var db = freeDisplayBoards.shift();
  p1.join(gid);
  p2.join(gid);
  db.join(gid);
  io.to(gid).emit('start_game', { asdf: 'hi'});
  console.log('Start Game');
}

io.on('connection', function(socket) {

  socket.on('display_hello', function(){
    freeDisplayBoards.push(socket);

    if(canStartGame()){
      startGame();
    }

    console.log('display hello');
  });

  socket.on('client_hello', function(){
    var uid = player_num;
    player_num = player_num + 1;
    playerQueue.push(socket);
    
    console.log('client_hello');

    if(canStartGame()){
      startGame();
    } else {
      socket.emit('position');
    }

    socket.on('play', function(data) {
      console.log(uid + " " + data.squareId);
    });
  });


});
