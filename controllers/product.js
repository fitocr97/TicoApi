
import { ProductModel } from '../models/product.js'


const create = async(req, res) => {
    try{
        //primero trabajamos con el request.body
        const { name } = req.body

        console.log(name)

        if (!name) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: name" }) //badrequest
        }
        
        //verificar si el producto ya existe
        const product = await ProductModel.findOneByName(name)

        if (product) {
            return res.status(409).json({ ok: false, msg: "Name already exists" })
        }


        //registrar el usuario
        const newProduct = await ProductModel.create({ name })

        return res.status(201).json({ok: true, mgs: newProduct.name})

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
        const products = await ProductModel.findAll() //usa el model

        return res.json({ ok: true, msg: products })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const ProductController = {
    create,
    findAll
}
