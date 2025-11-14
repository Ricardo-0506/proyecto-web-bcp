import express from 'express';
import { getStatementByType } from '../controllers/statement.controller.js';

const router = express.Router();

// Ruta de ejemplo para servicios
router.get('/:type', getStatementByType);

export default router;