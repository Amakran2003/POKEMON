import express from "express"
import * as pokemonCtrl from "../controllers/pokemon.controller"

const router = express.Router()

router.get("/", pokemonCtrl.getAll)
router.get("/:id", pokemonCtrl.getById)
router.post("/", pokemonCtrl.create)
router.delete("/:id", pokemonCtrl.deletePokemon)

export default router
