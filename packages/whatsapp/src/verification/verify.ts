import { Client } from "whatsapp-web.js";

export const verifyNumber = async (
  client: Client,
  phoneNumber: string,
  verificationToken: string
) => {
  const text = `Welcome to Units Bot! Click the following link to verify your number!: https://placeholder.com/${verificationToken}`;
  const chatId = phoneNumber.substring(1) + "@c.us";
  await client.sendMessage(chatId, text);
};
