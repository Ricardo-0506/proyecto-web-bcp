import express from 'express';
import { 
    getAllServices, 
    getServiceById 
} from '../controllers/service.controller.js';

const router = express.Router();

// Ruta de ejemplo para servicios
router.get('/', getAllServices);

router.get('/:id', getServiceById);

export default router;