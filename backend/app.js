import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB, disconnectDB } from './config/db.js';
import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

// Montar todas las rutas bajo /api
app.use('/api', routes);

// Endpoint simple que muestra las rutas disponibles (diagnóstico)
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    available: [
      '/api/services',
      '/api/services/:id',
      '/api/statements/:type',
      '/api/form-stats',
      '/api/news',
      '/api/contact (POST)',
      '/api/contact/messages (GET)'
    ]
  });
});

const PORT = process.env.PORT || 3000;

// Iniciar servidor y conectar a BD
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
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