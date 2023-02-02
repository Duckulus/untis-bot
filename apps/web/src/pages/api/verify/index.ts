import type { NextApiRequest, NextApiResponse } from "next";
import { createVerification, UserData } from "db";
import { verifyNumber } from "whatsapp";
import { z } from "zod";

export type VerifyResponse = { error?: string };

const userSchema = z.object({
  number: z.string(),
  untis_school: z.string(),
  untis_username: z.string(),
  untis_password: z.string(),
  untis_eap: z.string(),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<VerifyResponse>
) => {
  const userParse = userSchema.safeParse(JSON.parse(req.body));
  if (!userParse.success) {
    res.status(400).json({ error: "Failed to validate input" });
    return;
  }

  const user: UserData = userParse.data;
  const token = await createVerification(user);

  await verifyNumber(user.number, token);
  res.status(200);
};

export default handler;
