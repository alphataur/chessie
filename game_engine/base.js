const chess = require("chess.js")

function makeRandom(length){
  if(length === undefined)
    length = 6
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for(var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
  }
  return result;
}

class Game{
  constructor({fen}){
    this.game = new chess.Chess(fen)
    this.hash = makeRandom()
  }
  makeMove(move){
    let possibleMoves = this.possibleMoves()
    for(let m of possibleMoves){
      if(m == move){
        this.game.move(move)
        return true
      }
    }
    return false
  }
  possibleMoves(){
    return this.game.moves()
  }
  getHistory(){
    return this.game.history()
  }
}

module.exports = {
  Game,
  makeRandom
}
