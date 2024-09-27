import { EntryModel } from '../models/entry.js'

const create = async(req, res) => {
    try{
        //primero trabajamos con el request.body
        const { suppliers_id, product_id, amount, date } = req.body

        console.log(suppliers_id, product_id, amount, date)

        if (!suppliers_id || !product_id || !amount || !date) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: name, type, product_id, location, contact_name, phone" }) //badrequest
        }
        
        const newEntry = await EntryModel.create({ suppliers_id, product_id, amount, date })
        
        return res.status(201).json({ok: true, mgs: newEntry})

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
        const entries = await EntryModel.findAll() //usa el model

        return res.json({ ok: true, msg: entries })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const EntryController = {
    create,
    findAll
}
