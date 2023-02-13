import { Redis } from "ioredis";
import { REDIS_HOST } from "@jamal/env";

export const redisClient = new Redis({
  host: REDIS_HOST,
});
