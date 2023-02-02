import type { NextApiRequest, NextApiResponse } from "next";
import { createVerification, UserData } from "db";
import { z } from "zod";

type ResData = { token?: string; error?: string };

const userSchema = z.object({
  number: z.string(),
  untis_school: z.string(),
  untis_username: z.string(),
  untis_password: z.string(),
  untis_eap: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const userParse = userSchema.safeParse(req.body);
  if (!userParse.success) {
    res.status(400).json({ error: "Failed to validate input" });
    return;
  }

  const user: UserData = userParse.data;
  const token = await createVerification(user);
  res.status(200).json({ token });
};

export default handler;
