import {Command} from "../core/command";

Command.create({
  name: "help",
  description: "shows all commands",
  execute: async (msg) => {
    await msg.reply("Commands: \n" + Command.commands.map(cmd => `${cmd.name} - ${cmd.description}`).join("\n"))
  }
})