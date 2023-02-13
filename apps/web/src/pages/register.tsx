import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { BACKEND_URL } from "@untis-bot/env";
import { Title } from "@/components/meta/Title";

interface UserData {
  country: string;
  number: string;
  untis_school: string;
  custom_school: string;
  untis_username: string;
  untis_password: string;
  untis_eap: string;
}

type CountryCode = {
  name: string;
  dial_code: string;
  code: string;
};

type School = {
  name: string;
  school_id: string;
};

const RegisterPage: NextPage = () => {
  const initialValues: UserData = {
    country: "+49",
    number: "",
    untis_school: "frg-düsseldorf",
    custom_school: "school-id",
    untis_username: "",
    untis_password: "",
    untis_eap: "ajax.webuntis.com",
  };

  const router = useRouter();
  const [error, setError] = useState("");
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const ref = useRef<HTMLSelectElement>();

  useEffect(() => {
    fetch("/CountryCodes.json").then((resp) => {
      resp.json().then((data) => {
        setCountryCodes(data);
      });
    });

    fetch("/schools.json").then((resp) => {
      resp.json().then((data) => {
        setSchools(data);
      });
    });
  }, []);

  const handleSubmit = async (
    values: UserData,
    { setSubmitting }: FormikHelpers<UserData>
  ) => {
    const res = await fetch(`${BACKEND_URL}/verify`, {
      method: "post",
      body: JSON.stringify({
        ...values,
        untis_school:
          values.untis_school == "custom"
            ? values.custom_school
            : values.untis_school,
        number:
          values.country +
          (values.number.startsWith("0")
            ? values.number.substring(1)
            : values.number),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setSubmitting(false);
      await router.push("/verify");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <>
      <Title>Register | Jamal</Title>
      <div className="grid content-center justify-center gap-y-8">
        <h1 className="text-6xl text-tea">Register</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label className="text-lg">Number</label>
                <br />
                <Field
                  as="select"
                  className="px-2 py-1 rounded-l text-lg"
                  name="country"
                >
                  {countryCodes.map((code, i) => {
                    return (
                      <option key={i} value={code.dial_code}>
                        {code.code} {code.dial_code}
                      </option>
                    );
                  })}
                </Field>
                <Field
                  type="tel"
                  name="number"
                  className="px-2 py-1 rounded-r"
                  pattern="^[0-9]*$"
                />
              </div>
              <div>
                <label className="text-lg">School</label>
                <br />
                <Field
                  as={"select"}
                  className="px-2 py-1 rounded"
                  name="untis_school"
                  innerRef={ref}
                >
                  {schools.map((school, i) => {
                    return (
                      <option key={i} value={school.school_id}>
                        {school.name}
                      </option>
                    );
                  })}
                  {schools.length && <option value={"custom"}>Custom</option>}
                </Field>

                {ref.current?.options[ref.current.selectedIndex]?.value ==
                  "custom" && (
                  <>
                    <br />
                    <Field
                      type="text"
                      className="px-2 py-1 rounded"
                      name="custom_school"
                    />
                  </>
                )}
              </div>
              <div>
                <label className="text-lg">Username</label>
                <br />
                <Field
                  type="text"
                  className="px-2 py-1 rounded"
                  name="untis_username"
                />
              </div>
              <div>
                <label className="text-lg">Password</label>
                <br />
                <Field
                  type="password"
                  className="px-2 py-1 rounded"
                  name="untis_password"
                />
              </div>
              <div>
                <label className="text-lg">EAP</label>
                <br />
                <Field
                  type="text"
                  className="px-2 py-1 rounded"
                  name="untis_eap"
                />
              </div>
              {error && <p className="text-red-500 text-lg">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-2 py-1 bg-olivine text-darkpurple rounded my-4"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterPage;
