import { getWhatsappClient, startDailyJob } from "@untis-bot/whatsapp";

const whatsappClient = getWhatsappClient();
whatsappClient.initialize();
startDailyJob(whatsappClient);
