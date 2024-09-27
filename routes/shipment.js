import { Router } from "express";
import { ShipmentController } from "../controllers/shipment.js";
import { verifyToken } from "../middlewares/jwt_midleware.js";

const router = Router()

router.post('/create', verifyToken, ShipmentController.create)
router.get('/', verifyToken, ShipmentController.findAll)


export default router; //por defecto porque vamos a a tener varias instancias de este