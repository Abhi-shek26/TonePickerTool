// A simple in-memory cache using a Map
const cache = new Map();

export const cacheMiddleware = (req, res, next) => {
  const { text, tone } = req.body;
  const cacheKey = `${tone}::${text}`; 

  // Check if the response is already in the cache
  if (cache.has(cacheKey)) {
    console.log('Serving from cache');
    // If it is, send the cached data and immediately stop the request.
    return res.json({ transformedText: cache.get(cacheKey) });
  }

  // If we reach this point, it's a cache miss.
  console.log('Cache miss, calling API');
  // Proceed to the next middleware/controller to fetch the data from the API.
  next();
};

export const updateCache = (key, value) => {
  cache.set(key, value);
};
