import express from 'express';
import servicesRouter from './services.js';
import statementsRouter from './statements.js';
import formStatsRouter from './form-stats.js';
import newsRouter from './news.js';
import contactRouter from './contact.js';

const router = express.Router();

router.use('/services', servicesRouter);
router.use('/statements', statementsRouter);
router.use('/form-stats', formStatsRouter);
router.use('/news', newsRouter);
router.use('/contact', contactRouter);

export default router;

