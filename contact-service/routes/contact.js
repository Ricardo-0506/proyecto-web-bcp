import express from 'express';
import { 
    postContactMessage,
    getAllContactMessages
} from '../controllers/contact.controller.js';

const router = express.Router();

// Ruta de ejemplo para servicios
router.post('/', postContactMessage);

router.get('/messages', getAllContactMessages);

export default router;