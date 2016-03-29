var Board = function(){
  this.board = new Array(9);
};

Board.prototype.isValid = function(space){
  return this.board[space] == undefined;
}

Board.prototype.makeMove = function(space, symbol){
  this.board[space] = symbol;
}

module.exports = Board;
