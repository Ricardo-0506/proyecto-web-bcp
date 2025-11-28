import express from 'express';
import { 
    getAllProducts,
    getProductByTerm,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products-service.controller.js';

const router = express.Router();

// Ruta de ejemplo para servicios
router.get('/', getAllProducts);

router.get('/search', getProductByTerm);

router.post('/', createProduct)

router.patch('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;