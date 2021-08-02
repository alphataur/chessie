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
      return 100
    default:
      return 1
  }
}

class Game{
    constructor(repr, domID){
      if(repr === undefined){
        this.repr = this.initBoard()
        this.board = new Chess()
      }
      else{
        if(domID !== undefined)
          this.repr = this.initBoard(repr, domID)
        this.board = new Chess(repr)
      }
    }
    calCost(turn){
      // turn 0 if white's turn
      // turn 1 if black's turn
      let scores = this.getPieces().reduce((a, e) => {
        return a + pieceVal(e)
      }, 0)
      if(turn === 0)
        return scores
      else
        return -1 * scores
    }
    initBoard(repr, idx){
      if(repr === undefined)
        repr = "start"

      this.config = {
        position: repr,
        draggable: true,
        showNotation: false
      }
      if(idx === undefined)
        return new ChessBoard("game", this.config)
      else
        return new ChessBoard(idx, this.config)
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
    autoPlay(){
      console.log("autoplay")
      this.step = 0
      this.timer = setInterval(() => {
        if(this.isOver()){
          console.log("Game over")
          return clearInterval(this.timer)
        }
        console.log("making a move")
        let move = this.smartMove(this.step % 2)
        console.log(move, "move here!")
        this.makeMove(move)
        this.step++
      }, 1000)
    }
    randomMove(){
      let moves = this.getMoves()
      return moves[Math.floor(Math.random()*moves.length)]
    }
    smartMove(turn){
      let moves = this.getMoves()
      let bestMove = new Array(-10000, -10000)
      for(let move of moves){
        console.log(move, "genMove")
        let temp = new Game(this.board.fen(), "ghost")
        temp.makeMove(move)
        console.log(temp.calCost(turn), bestMove[0], "costi")
        if(temp.calCost(turn) > bestMove[0]){
          console.log("switching", move)
          bestMove[0] = temp.calCost(turn)
          bestMove[1] = move
        }
      }
      console.log(bestMove[1], "movi")
      return bestMove[1]
    }
}

window.onload = function(){
  let game = new Game()
  game.autoPlay()
  //console.log(Math.round(game.evalScore(), 2))
}
