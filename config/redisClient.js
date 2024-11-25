// const redis = require('redis');

// // Create a Redis client
// const redisClient = redis.createClient({
//   host: 'localhost',
//   port: 6379,
//   // password: '',
// });

// redisClient.on('error', (err) => {
//   console.log('Redis error: ', err);
// });

// module.exports = redisClient;

const Redis = require('redis');

// Create and configure Redis client
const redisClient = Redis.createClient();

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  try {
    await redisClient.connect(); // Connect to Redis
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
})();

module.exports = redisClient;
