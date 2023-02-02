import type { NextApiRequest, NextApiResponse } from "next";
import { createVerification, UserData } from "db";
import { z } from "zod";

type ResData = { token: string };

const userSchema = z.object({
  number: z.string(),
  untis_school: z.string(),
  untis_username: z.string(),
  untis_password: z.string(),
  untis_eap: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const user: UserData = userSchema.parse(req.body);

  const token = await createVerification(user);
  res.status(200).json({ token });
};

export default handler;
