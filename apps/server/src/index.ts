import { whatsAppClient, startDailyJob } from "whatsapp";

whatsAppClient.initialize();
startDailyJob(whatsAppClient);
