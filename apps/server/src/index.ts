import { whatsAppClient, startDailyJob } from "@untis-bot/whatsapp";
import { createApi } from "@untis-bot/api";

const startBot = () => {
  whatsAppClient.initialize();
  startDailyJob(whatsAppClient);
};

const startApi = () => {
  const app = createApi();
  app.listen(4000, () => console.log("Listening on port 4000"));
};

startBot();
startApi();
