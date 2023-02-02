import { Redis } from "ioredis";
import { v4 } from "uuid";

const redis = new Redis();

export const createVerification = async (userId: string) => {
  const token = v4();

  await redis.set(token, userId, "EX", 1000 * 60 * 60 * 24); // 1 day
  return token;
};

export const checkVerification = async (token: string) => {
  const userId = await redis.get(token);

  if (!userId) {
    return false;
  }

  return true;
};
