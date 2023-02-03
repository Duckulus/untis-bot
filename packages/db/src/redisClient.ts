import { Redis } from "ioredis";
import { REDIS_HOST } from "@untis-bot/env";

export const redisClient = new Redis({
  host: REDIS_HOST,
});
