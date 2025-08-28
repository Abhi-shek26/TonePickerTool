import { getMistralTransformation } from '../services/mistral.js';
import { updateCache } from '../middleware/cache.js';

export const transformToneController = async (req, res) => {
  const { text, tone } = req.body;

  if (!text || !tone) {
    return res.status(400).json({ error: 'Both "text" and "tone" are required in the request body.' });
  }

  try {
    const transformedText = await getMistralTransformation(text, tone);

    const cacheKey = `${tone}::${text}`;
    updateCache(cacheKey, transformedText);

    res.status(200).json({ transformedText });
  } catch (error) {
    console.error('Error in transform controller:', error);
    res.status(500).json({ error: error.message || 'An internal server error occurred.' });
  }
};
