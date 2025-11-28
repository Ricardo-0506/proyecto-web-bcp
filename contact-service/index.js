import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB, disconnectDB } from '../shared-db-config/db.js';
import routes from './routes/contact.js';

const app = express();

app.use(cors());
app.use(express.json());
// Montar todas las rutas bajo /api
app.use('/api/contacts', routes);

// Endpoint simple que muestra las rutas disponibles (diagnóstico)
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    available: [
        '/api/contact'
    ]
  });
});

const PORT = process.env.PORT || 3002;

// Iniciar servidor y conectar a BD
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`contact-service is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    await disconnectDB();
    process.exit(1);
  }
}

start();

// Manejar cierre graceful
process.on('SIGINT', async () => {
  console.log('\nCerrando servidor...');
  await disconnectDB();
  process.exit(0);
});