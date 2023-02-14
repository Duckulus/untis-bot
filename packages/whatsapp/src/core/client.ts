import qrcode from "qrcode-terminal";
import { Client, Message, LocalAuth } from "whatsapp-web.js";
import { Command } from "./command";
import { logger } from "@jamal/logger";

const createClient = () => {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      executablePath: process.env.CHROME_BIN,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--single-process",
      ],
    },
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", async () => {
    await Command.registerAll();
    logger.info("Client is ready!");
  });

  client.on("message_create", async (message: Message) => {
    await Command.handleMessage(message);
  });

  return client;
};

export const whatsAppClient = createClient();
