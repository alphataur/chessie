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
    autoMoves(){
        this.timer = setInterval(()=>{
            if(this.isOver())
                clearInterval(this.timer)
            console.log("making a move")
            let moves = this.getMoves()
            let randomMove = moves[Math.floor(Math.random()*moves.length)]
            console.log(randomMove)
            this.makeMove(randomMove)
        },100)
    }
}

window.onload = function(){
    let game = new Game()
    game.autoMoves()
}
