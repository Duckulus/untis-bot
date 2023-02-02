import { checkVerification } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type ResData = { found?: boolean; error?: string };

const querySchema = z.object({
  token: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const queryData = querySchema.safeParse(req.query);
  if (!queryData.success) {
    res.status(400).json({ error: "Failed to validate input" });
    return;
  }

  const { token } = queryData.data;
  const found = await checkVerification(token);
  res.status(200).json({ found });
};

export default handler;
