import { Router } from 'express';
import transformRoutes from './transform.js';

const router = Router();

// Use the transform routes for any request to /transform
router.use('/transform', transformRoutes);

export default router;
