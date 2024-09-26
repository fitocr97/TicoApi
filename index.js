import 'dotenv/config'   //leer variables entorno
import express from 'express';
import userRouter from './routes/user.js'
import cors from "cors";

const app = express();


app.use(cors());

app.use(express.json()) //poder enviar desde el cuerpo del mensaje
app.use(express.urlencoded({ extended: true }))  //habilitar enviar solicitudes desde formularios html

/*
app.get('/', (req, res) => {
    res.send('hola mundo')
});*/

app.use('/tico/v1/users', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server on'));

