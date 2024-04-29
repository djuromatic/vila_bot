import * as redis from 'redis'

const client = redis.createClient({
  url: process.env.REDIS_URL
});

(async () => {
  await client.connect();
  console.log('Connected to Redis');
})();

client.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});

export default client;
