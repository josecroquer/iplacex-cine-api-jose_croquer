import express from 'express';
import cors from 'cors';
import { connectDB } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import ActorRoutes from './src/actor/routes.js';

const app = express();
const port = 3000; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Bienvenido al cine Iplacex"); 
});

app.use('/api', peliculaRoutes);
app.use('/api', ActorRoutes);

connectDB()
    .then(() => {
        console.log("Éxito: Conexión a MongoDB Atlas establecida correctamente.");
        app.listen(port, () => {
            console.log(`Éxito: Servidor Express ejecutándose en el puerto ${port}`);
        });
    })
    .catch((error) => {
        console.error("Error: No se pudo conectar a Atlas. El servidor no iniciará.", error);
    });