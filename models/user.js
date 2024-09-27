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
        select 
            u.username, 
            u.email, 
            r.name AS role_name 
        from 
            users u 
        join roles r on u.role_id = r.rid
        `
    }
    const { rows } = await db.query(query)
    return rows //todas las filas
}

//buscar por id
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

const updateRoleAdm = async (uid) => {
    const query = {
        text: `
        UPDATE users
        SET role_id = 1
        WHERE uid = $1
        RETURNING *
        `,
        values: [uid]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

//exports exportamos el objeto
export const UserModel = {
    create,
    findOneByEmail,
    findAll,
    findOneByUid,
    updateRoleAdm
}