import { whatsAppClient, discordClient, startDailyJob } from "@jamal/bot";
import { DISCORD_BOT_TOKEN } from "@jamal/env";
import { createApi } from "@jamal/api";

const startWhatsappBot = () => {
  whatsAppClient.initialize();
  startDailyJob(whatsAppClient);
};

const startDiscordBot = () => {
  discordClient.login(DISCORD_BOT_TOKEN);
};

const startApi = () => {
  const app = createApi();
  app.listen(4000, () => console.log("Listening on port 4000"));
};

startWhatsappBot();
startDiscordBot();
startApi();
