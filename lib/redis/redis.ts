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
const redisAppend = promisify(redis.append).bind(redis);
const redisHSet = promisify(redis.hset).bind(redis); // Add this line


async function redisUpdate(hashName: string, field: string, value:string) {
  await redis.hset(hashName, field, value)
}

export { redisGet, redisSet, redisAppend, redisUpdate };


