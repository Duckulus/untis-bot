import { getWhatsappClient } from "../core/client";
import { FRONTEND_URL } from "@untis-bot/env";

export const verifyNumber = async (
  phoneNumber: string,
  verificationToken: string
) => {
  const text = `Welcome to Units Bot! Click the following link to verify your number!: ${FRONTEND_URL}/verify/${verificationToken}`;
  const chatId = phoneNumber.substring(1) + "@c.us";
  const whatsappClient = getWhatsappClient();
  try {
    await whatsappClient.sendMessage(chatId, text);
    return true;
  } catch {
    return false;
  }
};
