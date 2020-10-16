import React from "react";
import { Form as SemanticForm } from "semantic-ui-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { ReForm, Field, Form } from "./components";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function LoginForm() {
  const onSubmit = async (data, { reset, setIsSubmitting }) => {
    setIsSubmitting(true);
    await sleep(3000);
    setIsSubmitting(false);
    console.log(data);
    reset();
  };
  return (
    <div>
      <h3>ne ne Yosha!</h3>

      <ReForm
        initialState={{ firstName: "", lastName: "" }}
        onSubmit={onSubmit}
        phase2
        validators={{
          firstName(name) {
            if (name.length < 6)
              return "firstName should be at least 6 charcters";
          },
          lastName(name) {
            if (name.length < 6)
              return "lastName should be at least 6 charcters";
          },
        }}
      >
        <div className="form-container">
          <Form autoComplete="off" as={SemanticForm} noValidate>
            {({ errors, isSubmitting }) => {
              const errFirstName = `${errors.firstName ? "error" : ""}`;
              const errLastName = `${errors.lastName ? "error" : ""}`;
              return (
                <>
                  <div>
                    <Field
                      className={errFirstName}
                      placeholder="FirstName"
                      name="firstName"
                      as={SemanticForm.Input}
                    />
                    {errors.firstName && (
                      <div className="error">{`${errors.firstName}`}</div>
                    )}
                  </div>
                  <div>
                    <Field
                      className={errLastName}
                      placeholder="LastName"
                      name="lastName"
                      as={SemanticForm.Input}
                    />
                    {errors.lastName && (
                      <div className="error">{`${errors.lastName}`}</div>
                    )}
                  </div>
                  <button className="ui primary button" type="submit">
                    Submit
                  </button>
                </>
              );
            }}
          </Form>
        </div>
      </ReForm>
    </div>
  );
}

export default LoginForm;
