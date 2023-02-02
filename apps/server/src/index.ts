import { getWhatsappClient, startDailyJob } from "whatsapp";

const whatsappClient = getWhatsappClient();
whatsappClient.initialize();
startDailyJob(whatsappClient);
