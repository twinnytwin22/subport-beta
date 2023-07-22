import { Redis } from "ioredis";
import { promisify } from "util";

const getRedisUrl = () => {
  if (process.env.REDIS_URL as string) {
    return process.env.REDIS_URL! as string;
  }
  throw new Error("REDIS url is not defined");
};

export const redis = new Redis(getRedisUrl());
const redisGet = promisify(redis.get).bind(redis);
const redisSet = promisify(redis.set).bind(redis);
export { redisGet, redisSet };
