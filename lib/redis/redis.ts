import { Redis } from "ioredis";

const getRedisUrl = () => {
  if (process.env.REDIS_URL as string) {
    return process.env.REDIS_URL! as string;
  }
  throw new Error("REDIS url is not defined");
};

export const redis = new Redis(getRedisUrl());
