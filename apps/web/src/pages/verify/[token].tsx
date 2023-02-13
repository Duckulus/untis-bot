import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BACKEND_URL } from "@jamal/env";
import { Title } from "@/components/meta/Title";

const VerifyTokenPage: NextPage = () => {
  const router = useRouter();
  const [result, setResult] = useState("");

  useEffect(() => {
    const { token } = router.query;
    if (!token || typeof token !== "string") {
      return;
    }

    const checkToken = async (token: string) => {
      const res = await fetch(`${BACKEND_URL}/verify/${token}`, {
        method: "post",
      });
      setResult(res.ok ? "Phone Number validated" : "Invalid Validation Token");
    };

    checkToken(token);
  }, [router, setResult]);

  return (
    <>
      <Title>Verification | Jamal</Title>
      <div className="container mx-auto p-2">
        <p className="text-2xl lg:text-4xl">{result}</p>
      </div>
    </>
  );
};

export default VerifyTokenPage;
