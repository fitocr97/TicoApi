import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg //destructory

const connectionString = process.env.DATABASE_URL

export const db = new Pool({ //cpmfig para conectarnos a postgre
    allowExitOnIdle: true, //cerrar auto las conexiones
    connectionString  //string con los datos para coenctarnos
})

// verificar si funciona la conexion
try {
    await db.query('SELECT NOW()') //trae la fecha del servidor
    console.log('DATABASE connected')
} catch (error) {
    console.log(error)
}