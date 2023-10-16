import express from 'express';
import rutas from './routes/salones.routes.js';

const app = express();

app.use(express.json());

app.use('/api',rutas);

app.use((req, res, next)=>{
    res.status(404).json({
        mesagge: 'no se encontró esta ruta'
    })
});

export default app;