import React, { useState } from "react";
import { NextPage } from "next";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { BACKEND_URL } from "@untis-bot/env";

interface UserData {
  number: string;
  untis_school: string;
  untis_username: string;
  untis_password: string;
  untis_eap: string;
}

const RegisterPage: NextPage = () => {
  const initialValues: UserData = {
    number: "",
    untis_school: "",
    untis_username: "",
    untis_password: "",
    untis_eap: "",
  };

  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (
    values: UserData,
    { setSubmitting }: FormikHelpers<UserData>
  ) => {
    const res = await fetch(`${BACKEND_URL}/verify`, {
      method: "post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setSubmitting(false);
      router.push("/verify");
    } else {
      const data = await res.json();
      setError(data.error);
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
            {error && <p className="text-red-500">{error}</p>}
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
