import React from "react";
import { Form as SemanticForm } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { ReForm, Field, Form } from "..";
import "./App.css";

const Input = ({ touched, error, triedSubmit, ...props }) => {
  const errorS = (touched || triedSubmit) && error ? "error" : "";
  return (
    <>
      <div className={errorS}>
        {`${(touched || triedSubmit) && error ? error : ""}`}
      </div>
      <SemanticForm.Input className={errorS} {...props} />
    </>
  );
};

const validators = {
  firstName(name) {
    if (!name) {
      return "please provide a name";
    }
    if (name.length < 6) return "firstName should be at least 6 charcters";
  },
  lastName(name) {
    if (name.length < 6) return "lastName should be at least 6 charcters";
  },
};

const initialState = { firstName: "", lastName: "" };

// proxy async calls
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function LoginForm() {
  const onSubmit = async (data, { reset, setIsSubmitting }) => {
    setIsSubmitting(() => true);
    await sleep(3000);
    console.log(data);
    reset();
  };
  return (
    <div>
      <h3>ne ne Yosha!</h3>

      <ReForm
        initialState={initialState}
        onSubmit={onSubmit}
        validators={validators}
        phase2
      >
        {({ isSubmitting }) => (
          <div className="form-container">
            <Form autoComplete="off" as={SemanticForm} loading={isSubmitting}>
              <Field placeholder="FirstName" name="firstName" as={Input} />
              <Field placeholder="LastName" name="lastName" as={Input} />
              <button className="ui primary button" type="submit">
                Submit
              </button>
            </Form>
          </div>
        )}
      </ReForm>
    </div>
  );
}

export default LoginForm;
