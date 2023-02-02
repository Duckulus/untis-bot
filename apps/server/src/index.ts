import { getWhatsappClient, startDailyJob } from "@untis-bot/whatsapp";
import { createApi } from "@untis-bot/api";

const startBot = () => {
  const whatsappClient = getWhatsappClient();
  whatsappClient.initialize();
  startDailyJob(whatsappClient);
};

const startApi = () => {
  const app = createApi();
  app.listen(4000, () => console.log("Listening on port 4000"));
};

startBot();
startApi();
