import fs from "fs";
import { Message } from "whatsapp-web.js";
import { logger } from "@untis-bot/logger";
import path from "path";
import { getUser, upsertUser, User } from "@untis-bot/db";

export const COMMAND_PREFIX = ";";

export class Command {
  name: string;
  description?: string;
  aliases?: string[];
  usage?: string;
  examples?: string[];
  tags?: string[];

  execute: (msg: Message, args: string[], user?: User) => void | Promise<void>;

  static commands: Command[] = [];

  private constructor({
    name,
    description,
    aliases,
    usage,
    tags,
    examples,
    execute,
  }: CommandSettings) {
    this.name = name;
    this.description = description;
    this.aliases = aliases;
    this.usage = usage;
    this.tags = tags;
    this.examples = examples;
    this.execute = execute;
  }

  static create = (settings: CommandSettings) => {
    const result = new Command(settings);
    Command.commands.push(result);

    return result;
  };

  private static addCommandsRecursive = async (dir: string, folder: string) => {
    const commandFiles = fs.readdirSync(dir);

    for (const file of commandFiles) {
      const targetPath = path.join(dir, file);

      if (fs.lstatSync(targetPath).isDirectory()) {
        logger.info(`Registering category ${file}`);
        await Command.addCommandsRecursive(targetPath, file);
      }

      if (file.endsWith(".js")) {
        await import(path.join("..", "commands", folder, file));
        logger.info(`Registered command ${targetPath}`);
      }
    }
  };

  static registerAll = async () => {
    await Command.addCommandsRecursive(`${__dirname}/../commands`, "");
  };

  static handleMessage = async (message: Message) => {
    let content = message.body;

    if (!content.toLocaleLowerCase().startsWith(COMMAND_PREFIX)) {
      return;
    }

    const contact = await message.getContact();
    await upsertUser({
      number: contact.number,
    });
    const user = await getUser(contact.number);

    content = message.body.slice(COMMAND_PREFIX.length);
    const args = content.split(" ");
    const commandName = args.shift()?.toLocaleLowerCase();
    if (!commandName) {
      return;
    }

    for (const command of Command.commands) {
      if (
        command.name === commandName ||
        (command.aliases && command.aliases.includes(commandName))
      ) {
        logger.info(`Executing Command ${command.name} with args [${args}]`);

        try {
          await command.execute(message, args, user ?? undefined);
        } catch (e) {
          logger.error(e);
          await message.reply(
            `An error occured while executing that command. Please contact the developer. Or try again later. Error: ${e}`
          );
        }
        return;
      }
    }
  };
}

export interface CommandSettings {
  name: string;
  description?: string;
  aliases?: string[];
  usage?: string;
  tags?: string[];
  examples?: string[];
  execute: (msg: Message, args: string[], user?: User) => void | Promise<void>;
}
