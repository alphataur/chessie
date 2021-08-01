const pieceScores = {
  "R": 5.63,
  "N": 3.05,
  "B": 3.33,
  "Q": 9.5,
  "K": 1000,
}

function pieceVal(piece){
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
    evalScore(){
      //this cost functions returns score in white's perspective i.e higher the score the more possibility of white winning
      let pieces = this.board.fen().split(" ")[0].split('').filter((c)=>{
        return /^[A-Z]$/i.test(c)
      })
      return pieces.reduce((a, e) => {
        if(/^[A-Z]$/.test(e)){
          return a + pieceVal(e)
        }
        else{
          return a - pieceVal(e)
        }
      }, 0)
    }
    autoMoves(){
        this.timer = setInterval(()=>{
            if(this.isOver())
                clearInterval(this.timer)
            console.log("making a move")
            let moves = this.getMoves()
            let randomMove = moves[Math.floor(Math.random()*moves.length)]
            console.log(randomMove)
            console.log(this.evalScore())
            this.makeMove(randomMove)
        },1000)
    }
}

window.onload = function(){
  let game = new Game()
  console.log(Math.round(game.evalScore(), 2))
}
