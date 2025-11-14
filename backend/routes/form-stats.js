import express from 'express';
import {  getFormStats
} from '../controllers/stats.controller.js';

const router = express.Router();

// Ruta de ejemplo para servicios
router.get('/', getFormStats);

export default router;