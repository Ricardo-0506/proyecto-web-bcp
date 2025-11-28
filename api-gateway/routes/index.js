import express from 'express';
import productsRouter from './products.js';
import contactRouter from './contact.js';

const router = express.Router();

router.use('/products', productsRouter);
router.use('/contacts', contactRouter);

export default router;
