import { client } from '../common/db.js';
import { ObjectId } from 'mongodb';

const peliculaCollection = client.db('cine-db').collection('peliculas');

export const handleInsertPeliculaRequest = async (req, res) => {
    const data = req.body;
    peliculaCollection.insertOne(data)
        .then(result => res.status(201).json({ mensaje: "Película creada", data: result }))
        .catch(error => res.status(500).json({ error: "Error genérico al guardar", detalle: error }));
};

export const handleGetPeliculasRequest = async (req, res) => {
    peliculaCollection.find({}).toArray()
        .then(peliculas => res.status(200).json(peliculas))
        .catch(error => res.status(500).json({ error: "Error al obtener registros", detalle: error }));
};

export const handleGetPeliculaByIdRequest = async (req, res) => {
    const { id } = req.params;
    let queryId;
    
    try {
        queryId = new ObjectId(id);
    } catch (error) {
        return res.status(400).json({ error: "Id mal formado" }); 
    }

    peliculaCollection.findOne({ _id: queryId })
        .then(pelicula => {
            if (pelicula) {
                res.status(200).json(pelicula);
            } else {
                res.status(404).json({ error: "Película no encontrada" }); 
            }
        })
        .catch(error => res.status(500).json({ error: "Error genérico", detalle: error }));
};

export const handleUpdatePeliculaByIdRequest = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    let queryId;

    try {
        queryId = new ObjectId(id);
    } catch (error) {
        return res.status(400).json({ error: "Id mal formado" });
    }

    peliculaCollection.updateOne({ _id: queryId }, { $set: datosActualizados })
        .then(result => res.status(200).json({ mensaje: "Película actualizada", result }))
        .catch(error => res.status(500).json({ error: "Error genérico", detalle: error }));
};

export const handleDeletePeliculaByIdRequest = async (req, res) => {
    const { id } = req.params;
    let queryId;

    try {
        queryId = new ObjectId(id);
    } catch (error) {
        return res.status(400).json({ error: "Id mal formado" });
    }

    peliculaCollection.deleteOne({ _id: queryId })
        .then(result => res.status(200).json({ mensaje: "Película eliminada", result }))
        .catch(error => res.status(500).json({ error: "Error genérico", detalle: error }));
};