// Importamos MongoClient desde el driver de MongoDB
import { MongoClient } from 'mongodb';

// 1. Definimos la cadena de conexión (URI)
const uri = "mongodb+srv://josecroquer_db_user:josecroquer1234@cluster-express.15nez3a.mongodb.net/?appName=cluster-express";

// 2. Instanciamos el cliente de MongoDB
const client = new MongoClient(uri);

// 3. Creamos una función asíncrona para establecer la conexión
async function connectDB() {
    try {
        // Intentamos conectar al clúster
        await client.connect();
        
        // Retornamos el cliente para que pueda ser usado en otras partes (como en server.js)
        return client;
        
    } catch (error) {
        // Si hay un error, se mostrara y  la excepción
        console.error("Error crítico: No se pudo conectar al clúster de Atlas", error);
        throw error; 
    }
}

// 4. Exportamos el cliente y la función usando la sintaxis de módulos.
export { client, connectDB };