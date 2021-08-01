function pieceVal(piece){
  //returns piece value of a chess piece
  //adopted from https://en.wikipedia.org/wiki/Chess_piece_relative_value (refer alphazero)
  switch(piece.toLowerCase()){
    case "r":
      return 5.63
    case "n":
      return 3.05
    case "b":
      return 3.33
    case "q":
      return 9.5
    case "k":
      return 1000
    default:
      return 1
  }
}

class Game{
    constructor(repr){
        this.repr = this.initBoard(repr)
        this.board = new Chess()
    }
    calCost(turn){
      // turn 0 if white's turn
      // turn 1 if black's turn
      let scores = this.getPieces().reduce((a, e) => {
        return a + pieceVal(e)
      }, 0)
      if(turn === 0)
        console.log(scores)
      else
        console.log(-1 * scores)
    }
    initBoard(repr){
      if(repr === undefined)
        repr = "start"

      this.config = {
        position: repr,
        draggable: true,
        showNotation: false
      }
      return new ChessBoard("game", this.config)
    }
    isOver(){
        return this.board.game_over()
    }
    makeMove(move){
        this.board.move(move)
        this.repr.position(this.board.fen())
    }
    getMoves(){
        return this.board.moves()
    }
    getPieces(){
      //this cost functions returns score in white's perspective i.e higher the score the more possibility of white winning
      return this.board.fen().split(" ")[0].split('').filter((c)=>{
        return /^[A-Z]$/i.test(c)
      })
    }
    autoMoves(){
        this.timer = setInterval(()=>{
            if(this.isOver())
                clearInterval(this.timer)
            console.log("making a move")
            let moves = this.getMoves()
            let randomMove = moves[Math.floor(Math.random()*moves.length)]
            console.log(randomMove)
            this.calCost(0)
            //console.log(this.calCost(0))
            this.makeMove(randomMove)
        },1000)
    }
}

window.onload = function(){
  let game = new Game()
  game.autoMoves()
  //console.log(Math.round(game.evalScore(), 2))
}
