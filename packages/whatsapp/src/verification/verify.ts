import { getWhatsappClient } from "../core/client";

export const verifyNumber = async (
  phoneNumber: string,
  verificationToken: string
) => {
  const text = `Welcome to Units Bot! Click the following link to verify your number!: https://localhost:3000/api/verify/${verificationToken}`;
  const chatId = phoneNumber.substring(1) + "@c.us";
  const whatsappClient = getWhatsappClient();
  console.log(await whatsappClient.getChats());
  await whatsappClient.sendMessage(chatId, text);
};
