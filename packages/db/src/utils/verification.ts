import { v4 } from "uuid";
import { User } from "@prisma/client";
import { upsertUser } from "./user";
import { redisClient } from "../redisClient";

export type UserData = Omit<
  Omit<Omit<Omit<User, "createdAt">, "subscribed">, "hours">,
  "minutes"
>;

export const createVerification = async (user: UserData) => {
  const token = v4();

  await redisClient.set(token, JSON.stringify(user), "EX", 1000 * 60 * 60 * 24); // 1 day
  return token;
};

export const checkVerification = async (token: string) => {
  const userStr = await redisClient.get(token);

  if (!userStr) {
    return false;
  }

  const user = JSON.parse(userStr) as UserData;
  await redisClient.del(token);
  await upsertUser(user);

  return true;
};
