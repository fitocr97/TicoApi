import 'dotenv/config'   //leer variables entorno
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('hola mundo')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server on'));

