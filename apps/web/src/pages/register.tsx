import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { BACKEND_URL } from "@untis-bot/env";

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
  eap: string;
};

const RegisterPage: NextPage = () => {
  const initialValues: UserData = {
    country: "+49",
    number: "",
    untis_school: "",
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
    <div className="flex justify-center">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Number</label>
              <br />
              <Field as="select" name="country">
                {countryCodes.map((code, i) => {
                  return (
                    <option key={i} value={code.dial_code}>
                      {code.code} {code.dial_code}
                    </option>
                  );
                })}
              </Field>
              <Field type="tel" name="number" pattern="^[0-9]*$" />
            </div>
            <div>
              <label>School</label>
              <br />
              <Field as={"select"} name="untis_school" innerRef={ref}>
                {schools.map((school, i) => {
                  return (
                    <option key={i} value={school.eap}>
                      {school.name}
                    </option>
                  );
                })}
                <option value={"custom"}>Custom</option>
              </Field>

              {ref.current &&
                ref.current.options[ref.current.selectedIndex].value ==
                  "custom" && (
                  <>
                    <br />
                    <Field type="text" name="custom_school" />
                  </>
                )}
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
