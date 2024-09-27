import { db } from '../database/connection.js'

const create = async ({ container, product_id, amount, departure_date, location }) => { //async por la solicitud al server
    const query = {    //parametrizar los datos evitar inyecciones sql
        text: `
        INSERT INTO shipments (container, product_id, amount, departure_date, location)
        VALUES ($1, $2, $3, $4, $5 )
        RETURNING container, product_id, amount, departure_date, location
        `,
        values: [container, product_id, amount, departure_date, location] //destructory 
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
            s.container,
            s.amount,
            s.departure_date,
            s.location,
            p.name AS product_name
        FROM 
            shipments s
        JOIN 
            products p ON s.product_id = p.pid;
            `
    }
    const { rows } = await db.query(query)
    return rows //todas las filas
}


export const ShipmentModel = {
    create,
    findAll,
}
