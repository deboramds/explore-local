import express from "express";
import { getLugar, addLugar, updateLugar, deleteLugar } from "../controllers/lugares.js";





const router = express.Router()

router.get("/", getLugar)

router.post("/", addLugar)

router.put("/:id", updateLugar)

router.delete("/:id", deleteLugar)

export default router

