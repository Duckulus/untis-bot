import { v4 } from "uuid";
import { addUntisToUser } from "./user";
import { redisClient } from "../redisClient";

export type UserData = {
  number: string;
  untis_school: string;
  untis_username: string;
  untis_password: string;
  untis_eap: string;
};

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
  let untis = {
    untis_school: user.untis_school,
    untis_username: user.untis_username,
    untis_password: user.untis_password,
    untis_eap: user.untis_eap,
  };
  await redisClient.del(token);
  await addUntisToUser(user.number, untis);

  return true;
};
