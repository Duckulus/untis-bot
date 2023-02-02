import { checkVerification } from "@untis-bot/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export type TokenVerificationResponse = { found?: boolean; error?: string };

export const tokenQuerySchema = z.object({
  token: z.string(),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<TokenVerificationResponse>
) => {
  const queryData = tokenQuerySchema.safeParse(req.query);
  if (!queryData.success) {
    res.status(400).json({ error: "Failed to validate input" });
    return;
  }

  const { token } = queryData.data;
  const found = await checkVerification(token);
  res.status(200).json({ found });
};

export default handler;
