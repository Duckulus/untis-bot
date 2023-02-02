import React from "react";
import { NextPage } from "next";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { UserData } from "@untis-bot/db";
import type { VerifyResponse } from "./api/verify";
import { useRouter } from "next/router";

const RegisterPage: NextPage = () => {
  const initialValues: UserData = {
    number: "",
    untis_school: "",
    untis_username: "",
    untis_password: "",
    untis_eap: "",
  };

  const router = useRouter();

  const handleSubmit = async (
    values: UserData,
    { setSubmitting }: FormikHelpers<UserData>
  ) => {
    const res = await fetch("/api/verify", {
      method: "post",
      body: JSON.stringify(values),
    });
    const data: VerifyResponse = await res.json();

    if (data) {
      setSubmitting(false);
      router.push("/verify");
    }
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Number</label>
              <br />
              <Field type="tel" name="number" pattern="\+[0-9]{13}" />
            </div>
            <div>
              <label>School</label>
              <br />
              <Field type="text" name="untis_school" />
            </div>
            <div>
              <label>Username</label>
              <br />
              <Field type="text" name="untis_username" />
            </div>
            <div>
              <label>Password</label>
              <br />
              <Field type="password" name="untis_password" />
            </div>
            <div>
              <label>EAP</label>
              <br />
              <Field type="text" name="untis_eap" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-blue-500"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
