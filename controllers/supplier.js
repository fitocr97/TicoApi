import { SupplierModel } from '../models/supplier.js'

const create = async(req, res) => {
    try{
        //primero trabajamos con el request.body
        const { name, type, product_id, location, contact_name, phone } = req.body

        console.log(name, type, product_id, location, contact_name, phone)

        if (!name || !type || !product_id || !location || !contact_name || !phone) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: name, type, product_id, location, contact_name, phone" }) //badrequest
        }
        
        //verificar si el producto ya existe
        const supplier = await SupplierModel.findOneByName(name)

        if (supplier) {
            return res.status(409).json({ ok: false, msg: "Name already exists" })
        }

        //registrar
        const newSupplier = await SupplierModel.create({ name, type, product_id, location, contact_name, phone })

        return res.status(201).json({ok: true, mgs: newSupplier})

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
        const suppliers = await SupplierModel.findAll() //usa el model

        return res.json({ ok: true, msg: suppliers })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const SupplierController = {
    create,
    findAll
}
