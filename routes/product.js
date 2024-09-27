import { Router } from "express";
import { ProductController } from "../controllers/product.js";
import { verifyToken } from "../middlewares/jwt_midleware.js";

const router = Router()

router.post('/create', verifyToken, ProductController.create)
router.get('/', verifyToken, ProductController.findAll)


export default router; //por defecto porque vamos a a tener varias instancias de este