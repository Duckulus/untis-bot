import React from "react";
import type { NextPage } from "next";

const VerifyPage: NextPage = () => {
  return (
    <div className="container mx-auto p-2">
      <p className="text-2xl lg:text-4xl">
        We send a message to you via whatsapp, please click on the link to
        verify your number
      </p>
    </div>
  );
};

export default VerifyPage;
