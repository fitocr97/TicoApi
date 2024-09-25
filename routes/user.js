import {Router } from "express";
import { UserController } from "../controllers/user.js";

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

export default router; //por defecto porque vamos a a tener varias instancias de este