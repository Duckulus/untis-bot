import qrcode from "qrcode-terminal";
import { Client, Message, LocalAuth } from "whatsapp-web.js";
import { BotMessage, Command } from "../command";
import { logger } from "@jamal/logger";
import { getUser } from "@jamal/db";

const createWhatsappClient = () => {
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
    const botMsg = new WhatsAppMessage(message);
    await Command.handleMessage(botMsg);
  });

  return client;
};

export class WhatsAppMessage extends BotMessage {
  message: Message;

  constructor(message: Message) {
    super();
    this.message = message;
    this.content = message.body;
  }

  async reply(content: string) {
    this.message.reply(content);
  }

  async getUser() {
    const contact = await this.message.getContact();
    const user = await getUser(`+${contact.number}`);

    return user ?? undefined;
  }
}

export const whatsAppClient = createWhatsappClient();
