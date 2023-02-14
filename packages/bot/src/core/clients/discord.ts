import { ActivityType, Client, GatewayIntentBits, Message, Partials } from "discord.js";
import { logger } from "@jamal/logger";
import { BotMessage, Command } from "../command";
import { COMMAND_PREFIX } from "../../utils/constants";

const createDiscordClient = () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences,
    ],
    partials: [Partials.Message],
  });

  client.on("error", (e) => {
    logger.error(e.message);
  });

  client.on("warn", (w) => {
    logger.warn(w);
  });

  client.on("ready", async () => {
    logger.info(`Logged in as ${client.user?.username}`);

    client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: `${COMMAND_PREFIX}help`,
          type: ActivityType.Listening,
        },
        {
          name: "donda",
          type: ActivityType.Listening,
        },
      ],
    });
  });

  // TODO: Slash commands
  client.on("messageCreate", async (message) => {
    const botMsg = new DiscordMessage(message);
    await Command.handleMessage(botMsg);
  });

  return client;
};

export class DiscordMessage extends BotMessage {
  message: Message;

  constructor(message: Message) {
    super();
    this.message = message;
    this.content = message.content;
  }

  async reply(content: string) {
    this.message.reply(content);
  }

  // TODO: Update getUser to query database
  async getUser() {
    // const userid = await this.message.author.id;
    // const user = await getUser(userid);

    // return user ?? undefined;
    return undefined;
  }
}

export const discordClient = createDiscordClient();
