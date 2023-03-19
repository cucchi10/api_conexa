import { Redis } from 'ioredis';
import { cacheHost, cachePort } from './config';

let redis: Redis;

export default function cacheConnect(): Redis {
  if (!redis) {
    redis = new Redis({
      host: cacheHost,
      port: Number(cachePort),
    });
  }
  return redis;
}
