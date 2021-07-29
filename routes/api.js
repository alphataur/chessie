const {Router} = require("express")
const {Game} = require("../game_engine/base")

let router = Router()

let games = {}

router.get("/healthcheck", (req, res) => {
  res.json({alive: true})
})


router.get("/:id/move", (req, res) => {
  let id = req.params.id
  let move = req.query.move
  games[id].move(move)
})


router.get("/new", (req, res) => {
  let fen = req.query.fen
  let game = new Game(fen)
  games[game.hash] = game
})

router.get("/:id/is_over", (req, res) => {
  
})

module.exports = {
  gameRouter: router
}
