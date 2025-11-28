  import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.URL;
const DB_NAME = process.env.DB_NAME || 'bcp_web';

if (!uri) {
  console.error('[ERROR] No se encontró la variable de entorno URL para MongoDB.');
  console.error('Asegúrate de crear un archivo .env en la carpeta `backend` con:');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbConnection;

export async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    dbConnection = client.db(DB_NAME);
    console.log("✅ Conectado exitosamente a MongoDB!");
    return client;
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}

export async function disconnectDB() {
  try {
    await client.close();
    console.log("Desconectado de MongoDB.");
  } catch (error) {
    console.error("Error al desconectar:", error);
  }
}

export function getDB() {
    if (!dbConnection) {
      throw new Error("La base de datos no está conectada.");
    }
    return dbConnection;
}
