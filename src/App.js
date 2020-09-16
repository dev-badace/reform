import React from "react";
import "./App.css";
import Form from "./components/Form";
import Feild from "./components/Field";

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

function LoginForm() {
  const onSubmit = async (data, { setIsSubmitting, reset }) => {
    console.log(data);
    reset();
  };
  return (
    <div>
      <h3>ne ne Yosha!</h3>
      <Form initialState={{ name: "", password: "" }} onSubmit={onSubmit}>
        {({ values, valueChange }) => (
          <>
            <Feild name="name" value={values.name} onChange={valueChange} />
            <Feild
              type="password"
              name="password"
              value={values.password}
              onChange={valueChange}
            />
            <button>Submit</button>
          </>
        )}
      </Form>
      {/* <Form
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
        {({ values, valueChange, errors, isSubmitting }) => {
          const errFirstName = `${errors.firstName ? "error" : ""}`;
          const errLastName = `${errors.lastName ? "error" : ""}`;

          return (
            <>
              <div>
                <input
                  type="text"
                  className={errFirstName}
                  placeholder="FirstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={valueChange}
                />
                {errors.firstName && (
                  <div className="error">{`${errors.firstName}`}</div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  className={errLastName}
                  placeholder="LastName"
                  name="lastName"
                  value={values.lastName}
                  onChange={valueChange}
                />
                {errors.lastName && (
                  <div className="error">{`${errors.lastName}`}</div>
                )}
              </div>
              <button disabled={isSubmitting}>Submit</button>
            </>
          );
        }}
      </Form> */}
    </div>
  );
}

export default LoginForm;
