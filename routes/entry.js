import { Router } from "express";
import { EntryController } from "../controllers/entry.js";
import { verifyToken } from "../middlewares/jwt_midleware.js";

const router = Router()

router.post('/create', verifyToken, EntryController.create)
router.get('/', verifyToken, EntryController.findAll)


export default router; //por defecto porque vamos a a tener varias instancias de este