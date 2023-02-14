import { whatsAppClient } from "../core/clients/whatsapp";
import { FRONTEND_URL } from "@jamal/env";

export const verifyNumber = async (
  phoneNumber: string,
  verificationToken: string
) => {
  const text = `Welcome to Units Bot! Click the following link to verify your number!:\n${FRONTEND_URL}/verify/${verificationToken}`;
  const chatId = phoneNumber.substring(1) + "@c.us";
  try {
    await whatsAppClient.sendMessage(chatId, text);
    return true;
  } catch {
    return false;
  }
};
