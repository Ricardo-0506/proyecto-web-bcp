import express from 'express';
import statementsRouter from './statements.js';
import formStatsRouter from './form-stats.js';
import newsRouter from './news.js';

const router = express.Router();

router.use('/statements', statementsRouter);
router.use('/form-stats', formStatsRouter);
router.use('/news', newsRouter);

export default router;

