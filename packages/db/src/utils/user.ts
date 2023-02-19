import { prisma } from "../prismaClient";
import { Untis, User } from "@prisma/client";

export const getUserByNumber = async (number: string) => {
  return await prisma.user.findUnique({
    where: {
      whatsappUserNumber: number,
    },
    include: {
      discordUser: true,
      whatsappUser: true,
      untis: true,
    },
  });
};

export const getUntis = async (id: string) => {
  return await prisma.untis.findMany({
    where: {
      User: {
        every: {
          id: id,
        },
      },
    },
  });
};

export const getUserByDiscordId = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      discordUserId: id,
    },
    include: {
      discordUser: true,
      whatsappUser: true,
      untis: true,
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      untis: true,
    },
  });
};

export const setSubscribed = async (id: string, subscribed: boolean) => {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      subscribed,
    },
  });
};

export const createUserWithWhatsapp = async (number: string) => {
  return await prisma.user.create({
    data: {
      whatsappUser: {
        create: {
          number: number,
        },
      },
    },
    include: {
      whatsappUser: true,
      untis: true,
    },
  });
};

export const createUserWithDiscord = async (userid: string) => {
  return await prisma.user.create({
    data: {
      discordUser: {
        create: {
          userId: userid,
          oauthToken: "",
        },
      },
    },
    include: {
      discordUser: true,
      untis: true,
    },
  });
};

export const addUntisToUser = async (number: string, untis: Partial<Untis>) => {
  await prisma.user.update({
    where: {
      whatsappUserNumber: number,
    },
    data: {
      untis: {
        create: untis,
      },
    },
  });
};

export const upsertUser = async (user: Partial<User>) => {
  if (!user.id) return;
  await prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: {
      ...user,
    },
    update: {
      ...user,
    },
  });
};
