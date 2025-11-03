import express from "express";
import * as attackCtrl from "../controllers/attack.controller.js";

const router = express.Router();

router.get("/", attackCtrl.getAllAttacks);
router.post("/", attackCtrl.createAttack);
router.delete("/:id", attackCtrl.deleteAttack);

export default router;
