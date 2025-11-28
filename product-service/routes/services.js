import express from 'express';
import { 
    getAllServices, 
    getServiceByTerm,
    createService,
    updateService,
    deleteService
} from '../controllers/service.controller.js';

const router = express.Router();

// Ruta de ejemplo para servicios
router.get('/', getAllServices);

router.get('/search', getServiceByTerm);

router.post('/', createService)

router.patch('/:id', updateService);

router.delete('/:id', deleteService);

export default router;