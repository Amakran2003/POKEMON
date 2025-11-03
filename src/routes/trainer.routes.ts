import express from "express"
import * as trainerCtrl from "../controllers/trainer.controller"

const router = express.Router()

router.get("/", trainerCtrl.getAllTrainers)
router.get("/:id", trainerCtrl.getTrainerById)
router.post("/", trainerCtrl.createTrainer)
router.put("/:id", trainerCtrl.updateTrainer)
router.delete("/:id", trainerCtrl.deleteTrainer)
router.post("/:id/pokemon", trainerCtrl.addPokemonToTrainer)

export default router
