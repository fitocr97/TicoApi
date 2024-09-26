import {Router } from "express";
import { UserController } from "../controllers/user.js";
import { verifyToken } from "../middlewares/jwt_midleware.js";

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/profile', verifyToken, UserController.profile)

export default router; //por defecto porque vamos a a tener varias instancias de este