const Redis = require('ioredis');

const redis = new Redis({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
	family: 4,
	password: process.env.REDIS_PASSWORD,
	db: 0
});

module.exports = redis;
