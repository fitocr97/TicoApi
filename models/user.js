import { db } from '../database/connection.js'

const create = async ({ email, password, username }) => { //async por la solicitud al server
    const query = {    //parametrizar los datos evitar inyecciones sql
        text: `
        INSERT INTO users (email, password, username)
        VALUES ($1, $2, $3)
        RETURNING email, username, uid
        `,
        values: [email, password, username] //destructory 
    }
        //returning devolver datos
    const { rows } = await db.query(query)  //db recibe el query, devuelve un objeto las rows que las devolvemos al controller
    return rows[0]  //devolver el primer resultado
}

//buscar por email
const findOneByEmail = async (email) => {
    const query = {
        text: `
        SELECT * FROM users
        WHERE email = $1
        `,
        values: [email]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

const findAll = async () => {
    const query = {
        text: `
        SELECT * FROM users
        `
    }
    const { rows } = await db.query(query)
    return rows
}

/*
const findOneByUid = async (uid) => {
    const query = {
        text: `
        SELECT * FROM users
        WHERE uid = $1
        `,
        values: [uid]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

const updateRoleVet = async (uid) => {
    const query = {
        text: `
        UPDATE users
        SET role_id = 2
        WHERE uid = $1
        RETURNING *
        `,
        values: [uid]
    }
    const { rows } = await db.query(query)
    return rows[0]
}
*/
//exports exportamos el objeto
export const UserModel = {
    create,
    findOneByEmail,
    findAll,
    //findOneByUid,
   // updateRoleVet
}