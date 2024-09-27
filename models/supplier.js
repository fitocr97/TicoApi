import { db } from '../database/connection.js'

const create = async ({ name, type, product_id, location, contact_name, phone }) => { //async por la solicitud al server
    const query = {    //parametrizar los datos evitar inyecciones sql
        text: `
        INSERT INTO suppliers (name, type, product_id, location, contact_name, phone)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING name, type, product_id, location, contact_name, phone
        `,
        values: [name, type, product_id, location, contact_name, phone] //destructory 
    }
        //returning devolver datos
    const { rows } = await db.query(query)  //db recibe el query, devuelve un objeto las rows que las devolvemos al controller
    return rows[0]  //devolver el primer resultado
}

//buscar por nombre
const findOneByName = async (name) => {
    const query = {
        text: `
        SELECT * FROM suppliers
        WHERE name = $1
        `,
        values: [name]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

//select all
const findAll = async () => {
    const query = {
        text: `
        SELECT * FROM suppliers
        `
    }
    const { rows } = await db.query(query)
    return rows //todas las filas
}


export const SupplierModel = {
    create,
    findOneByName,
    findAll,
}