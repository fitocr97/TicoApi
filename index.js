import 'dotenv/config'   //leer variables entorno
import express from 'express';
import userRouter from './routes/user.js'
import productRouter from './routes/product.js'
import supplierRouter from './routes/supplier.js'
import entriesRouter from './routes/entry.js'
import shipmentsRouter from './routes/shipment.js'

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
app.use('/tico/v1/products', productRouter)
app.use('/tico/v1/suppliers', supplierRouter)
app.use('/tico/v1/entries', entriesRouter)
app.use('/tico/v1/shipments', shipmentsRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server on'));

