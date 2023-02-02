import { Redis } from "ioredis";
import { v4 } from "uuid";
import { User } from "@prisma/client";
import { upsertUser } from "./user";

const redis = new Redis();

type UserData = Omit<Omit<User, "createdAt">, "subscribed">;

export const createVerification = async (user: UserData) => {
  const token = v4();

  await redis.set(token, JSON.stringify(user), "EX", 1000 * 60 * 60 * 24); // 1 day
  return token;
};

export const checkVerification = async (token: string) => {
  const userStr = await redis.get(token);

  if (!userStr) {
    return false;
  }

  const user = JSON.parse(userStr) as UserData;
  await redis.del(token);
  await upsertUser(user);

  return true;
};
