import { createClient, startDailyJob } from "whatsapp";

const client = createClient();
client.initialize();

startDailyJob(client);
