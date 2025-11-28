import express from 'express';
import { 
    postContactMessage,
    getAllContactMessages
} from '../controllers/contact-service.controller.js';

const router = express.Router();

// Ruta de ejemplo para servicios
router.get('/', getAllContactMessages);

router.post('/', postContactMessage)

export default router;