import { Router } from 'express';
import { transformToneController } from '../controllers/transform.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = Router();

// Define the POST route for text transformation
router.post('/', cacheMiddleware, transformToneController);

export default router;
