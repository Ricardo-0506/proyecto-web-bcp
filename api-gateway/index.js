import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Rutas del API Gateway
app.use('/api-gateway', routes);

// Endpoint simple que muestra las rutas disponibles (diagnóstico)
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    available: [
        '/api/products',
        '/api/contacts'
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
