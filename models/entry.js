import { db } from '../database/connection.js'

const create = async ({ suppliers_id, product_id, amount, date }) => { //async por la solicitud al server
    const query = {    //parametrizar los datos evitar inyecciones sql
        text: `
        INSERT INTO entries (suppliers_id, product_id, amount, date)
        VALUES ($1, $2, $3, $4 )
        RETURNING suppliers_id, product_id, amount, date
        `,
        values: [suppliers_id, product_id, amount, date] //destructory 
    }
        //returning devolver datos
    const { rows } = await db.query(query)  //db recibe el query, devuelve un objeto las rows que las devolvemos al controller
    return rows[0]  //devolver el primer resultado
}

/*
const findOneByName = async (name) => {
    const query = {
        text: `
        SELECT * FROM entries
        WHERE name = $1
        `,
        values: [name]
    }
    const { rows } = await db.query(query)
    return rows[0]
}*/

//select all
const findAll = async () => {
    const query = {
        text: `
        SELECT 
            s.name AS supplier_name,
            p.name AS product_name,
            e.amount,
            e.date
        FROM 
            entries e
        JOIN 
            suppliers s ON e.suppliers_id = s.sid
        JOIN 
            products p ON e.product_id = p.pid;
        `
    }
    const { rows } = await db.query(query)
    return rows //todas las filas
}


export const EntryModel = {
    create,
    findAll,
}
