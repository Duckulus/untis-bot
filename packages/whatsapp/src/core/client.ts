import qrcode from "qrcode-terminal";
import { Client, Message, LocalAuth, Contact } from "whatsapp-web.js";
import { Command } from "./command";
import { logger } from "logger";

let me: Contact | undefined;
export const myContact = () => {
  return me;
};

const findMyContact = async (client: Client) => {
  const contacts = await client.getContacts();
  for (let contact of contacts) {
    if (contact.isMe) {
      me = contact;
      logger.info(`Found my contact: ${me.pushname}`);
      return;
    }
  }

  logger.warn("Could not find my contact");
};

export const createClient = () => {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
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
    await findMyContact(client);
    logger.info("Client is ready!");
  });

  client.on("message_create", async (message: Message) => {
    await Command.handleMessage(message);
  });

  return client;
};