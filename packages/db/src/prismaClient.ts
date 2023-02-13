import { prismaLogger } from "@jamal/logger";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: [
    {
      level: "query",
      emit: "event",
    },
    {
      level: "info",
      emit: "event",
    },
    {
      level: "warn",
      emit: "event",
    },
    {
      level: "error",
      emit: "event",
    },
  ],
});

prisma.$on("query", (e) => {
  prismaLogger.debug(`Query: ${e.params} ${e.duration}ms`);
});

prisma.$on("info", (e) => {
  prismaLogger.info(`${e.message}`);
});

prisma.$on("warn", (e) => {
  prismaLogger.warn(`${e.message}`);
});

prisma.$on("error", (e) => {
  prismaLogger.error(`${e.message}`);
});
