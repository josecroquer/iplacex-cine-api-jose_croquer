import { client } from '../common/db.js';
import { ObjectId } from 'mongodb';

const actorCollection = client.db('cine-db').collection('actores');
const peliculaCollection = client.db('cine-db').collection('peliculas');

export const handleInsertActorRequest = async (req, res) => {
    const { nombrePelicula, nombre, edad, estaRetirado, premios } = req.body;

    peliculaCollection.findOne({ nombre: nombrePelicula })
        .then(peliculaEncontrada => {
            if (!peliculaEncontrada) {
                return res.status(404).json({ error: "La película indicada no existe en los registros" }); 
            }

            const nuevoActor = {
                idPelicula: peliculaEncontrada._id.toString(), 
                nombre,
                edad,
                estaRetirado,
                premios
            };

            actorCollection.insertOne(nuevoActor)
                .then(result => res.status(201).json({ mensaje: "Actor creado exitosamente", data: result })) 
                .catch(error => res.status(500).json({ error: "Error genérico al guardar el actor", detalle: error }));
        })
        .catch(error => res.status(500).json({ error: "Error genérico al validar la película", detalle: error }));
};

export const handleGetActoresRequest = async (req, res) => {
    actorCollection.find({}).toArray()
        .then(actores => res.status(200).json(actores)) 
        .catch(error => res.status(500).json({ error: "Error genérico al obtener actores", detalle: error }));
};

export const handleGetActorByIdRequest = async (req, res) => {
    const { id } = req.params;
    let queryId;

    try {
        queryId = new ObjectId(id);
    } catch (error) {
        return res.status(400).json({ error: "Id mal formado" }); 
    }

    actorCollection.findOne({ _id: queryId })
        .then(actor => {
            if (actor) {
                res.status(200).json(actor);
            } else {
                res.status(404).json({ error: "Actor no encontrado" });
            }
        })
        .catch(error => res.status(500).json({ error: "Error genérico", detalle: error }));
};

export const handleGetActoresByPeliculaRequest = async (req, res) => {
    const { pelicula } = req.params; 

    actorCollection.find({ idPelicula: pelicula }).toArray()
        .then(actores => res.status(200).json(actores))
        .catch(error => res.status(500).json({ error: "Error genérico al buscar actores de la película", detalle: error }));
};