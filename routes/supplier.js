import { Router } from "express";
import { SupplierController } from "../controllers/supplier.js";
import { verifyToken } from "../middlewares/jwt_midleware.js";

const router = Router()

router.post('/create', verifyToken, SupplierController.create)
router.get('/', verifyToken, SupplierController.findAll)


export default router; //por defecto porque vamos a a tener varias instancias de este