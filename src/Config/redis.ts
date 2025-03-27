import Redis from 'ioredis';
import { config } from 'dotenv';

// Load environment variables (if needed)
config();

// Create and configure the Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1', // Redis server address
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379, // Redis server port
  password: process.env.REDIS_PASSWORD, // Redis password if authentication is needed
  db: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB) : 0, // Default DB number
  
  // Optionally, configure Redis retry strategies or other advanced options
  retryStrategy: (times) => {
    if (times > 10) {
      return undefined; // Stops retrying after 10 attempts
    }
    return Math.min(times * 50, 2000); // Retry delay (in ms)
  },
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redis;
