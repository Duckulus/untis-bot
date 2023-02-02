import { checkVerification } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type ResData = { found: boolean };

const querySchema = z.object({
  token: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const { token } = querySchema.parse(req.query);
  const found = await checkVerification(token);

  res.status(200).json({ found });
};

export default handler;
