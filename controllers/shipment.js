import { ShipmentModel } from '../models/shipment.js'

const create = async(req, res) => {
    try{
        //primero trabajamos con el request.body
        const { container, product_id, amount, departure_date, location } = req.body

        console.log(container, product_id, amount, departure_date, location)

        if (!container || !product_id || !amount || !departure_date || !location) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: name, type, product_id, location, contact_name, phone" }) //badrequest
        }
        
        const newShipment = await ShipmentModel.create({ container, product_id, amount, departure_date, location})
        
        return res.status(201).json({ok: true, mgs: newShipment})

    } catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const findAll = async (req, res) => {
    try {
        const shipments = await ShipmentModel.findAll() //usa el model

        return res.json({ ok: true, msg: shipments })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const ShipmentController = {
    create,
    findAll
}
