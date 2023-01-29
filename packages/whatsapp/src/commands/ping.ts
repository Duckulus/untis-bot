import {Command} from "../core/command";

Command.create({
  name: "ping",
  description: "pong",
  usage: "ping",
  examples: [],
  async execute(msg, args, user) {
    await msg.reply(user!.number)
  }
})