import express from 'express';
import { getAllNews } from '../controllers/news.controller.js';

const router = express.Router();

// Ruta para obtener todas las noticias
router.get('/', getAllNews);

export default router;