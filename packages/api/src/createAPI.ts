import express from "express";
import cors from "cors";
import { checkVerification, createVerification, UserData } from "@untis-bot/db";
import { expressLogger } from "@untis-bot/logger";
import { verifyNumber } from "@untis-bot/whatsapp";
import { z } from "zod";
import { FRONTEND_URL } from "@untis-bot/env";
import { WebUntis } from "webuntis";

export type VerifyResponse = { error?: string };

const userSchema = z.object({
  number: z.string(),
  untis_school: z.string(),
  untis_username: z.string(),
  untis_password: z.string(),
  untis_eap: z.string(),
});

export const createApi = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(expressLogger);

  app.use(
    cors({
      origin: FRONTEND_URL,
    })
  );

  app.get("/", (_req, res) => {
    res.send("Hello API");
  });

  app.post("/verify", async (req, res) => {
    const userParse = userSchema.safeParse(req.body);
    if (!userParse.success) {
      res.status(400).json({ error: "Failed to validate input" });
      return;
    }

    const user: UserData = userParse.data;

    try {
      const untis = new WebUntis(
        user.untis_school,
        user.untis_username,
        user.untis_password,
        user.untis_eap
      );
      await untis.login();
      await untis.logout();
    } catch {
      res.status(400).json({ error: "Invalid user credentials" });
      return;
    }

    const token = await createVerification(user);

    await verifyNumber(user.number, token);
    res.status(200).send();
  });

  app.post("/verify/:token", async (req, res) => {
    const token = req.params.token;
    const found = await checkVerification(token);

    if (!found) {
      res.status(400).json({ error: "Invalid token" });
      return;
    }

    res.status(200).send();
  });

  return app;
};
