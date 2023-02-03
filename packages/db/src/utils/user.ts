import { User } from "@prisma/client";
import { prisma } from "../prismaClient";

export const getUser = async (number: string) => {
  return await prisma.user.findUnique({
    where: {
      number,
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const setSubscribed = async (number: string, subscribed: boolean) => {
  await prisma.user.update({
    where: {
      number,
    },
    data: {
      subscribed,
    },
  });
};

export const upsertUser = async (user: Partial<User>) => {
  const { number, untis_username, untis_password, untis_school, untis_eap } =
    user;
  if (!number) return;
  await prisma.user.upsert({
    create: {
      number,
    },
    update: {
      untis_username,
      untis_password,
      untis_school,
      untis_eap,
    },
    where: {
      number,
    },
  });
};
