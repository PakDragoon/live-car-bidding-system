const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
  // password: '',
});

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

module.exports = redisClient;
