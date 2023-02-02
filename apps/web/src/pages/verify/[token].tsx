import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { TokenVerificationResponse } from "../api/verify/[token]";

const VerifyTokenPage: NextPage = () => {
  const router = useRouter();
  const [result, setResult] = useState("");

  useEffect(() => {
    const { token } = router.query;
    if (!token || typeof token !== "string") {
      return;
    }

    const checkToken = async (token: string) => {
      const data = await fetch(`/api/verify/${token}`, { method: "post" });
      const res: TokenVerificationResponse = await data.json();
      if (res.error) {
        setResult(res.error);
      } else {
        setResult(
          res.found ? "Phone Number validated" : "Invalid Validation Token"
        );
      }
    };

    checkToken(token);
  }, [router, setResult]);

  return <div>{result}</div>;
};

export default VerifyTokenPage;
