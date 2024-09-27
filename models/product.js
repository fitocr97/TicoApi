import { db } from '../database/connection.js'

const create = async ({ name }) => { //async por la solicitud al server
    const query = {    //parametrizar los datos evitar inyecciones sql
        text: `
        INSERT INTO products (name)
        VALUES ($1)
        RETURNING name
        `,
        values: [name] //destructory 
    }
        //returning devolver datos
    const { rows } = await db.query(query)  //db recibe el query, devuelve un objeto las rows que las devolvemos al controller
    return rows[0]  //devolver el primer resultado
}

//buscar por nombre
const findOneByName = async (name) => {
    const query = {
        text: `
        SELECT * FROM products
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
        SELECT * FROM products
        `
    }
    const { rows } = await db.query(query)
    return rows //todas las filas
}


export const ProductModel = {
    create,
    findOneByName,
    findAll,
}
