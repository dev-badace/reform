import React from "react";
import "./App.css";
import Form from "./components/Form";
import Feild from "./components/Field";

function LoginForm() {
  const onSubmit = async (data, { setIsSubmitting, reset }) => {
    console.log(data);
    reset();
  };
  return (
    <>
      <Form
        initialState={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          option: "",
        }}
        onSubmit={onSubmit}
        phase2
        validators={{
          default(v) {
            console.log(v.firstName);
          },
          firstName(name) {
            // console.log(name);
            if (name.length < 6)
              return "firstName should be at least 6 charcters";
          },
          lastName(name) {
            if (name.length < 6)
              return "lastName should be at least 6 charcters";
          },
        }}
      >
        {({ values, errors, isSubmitting }) => {
          const errFirstName = `${errors.firstName ? "error" : ""}`;
          const errLastName = `${errors.lastName ? "error" : ""}`;

          return (
            <>
              <div>
                <Feild
                  className={errFirstName}
                  placeholder="FirstName"
                  name="firstName"
                />
                {errors.firstName && (
                  <div className="error">{`${errors.firstName}`}</div>
                )}
              </div>
              <div>
                <Feild
                  className={errLastName}
                  placeholder="LastName"
                  name="lastName"
                />
                {errors.lastName && (
                  <div className="error">{`${errors.lastName}`}</div>
                )}
              </div>
              <label htmlFor="chocolate">isTall</label>
              <Feild
                type="checkbox"
                id="chocolate"
                name="isTall"
                checked={values.isTall}
              />
              first:{" "}
              <Feild
                type="checkbox"
                name="cookies"
                value="first"
                checked={values.cookies.includes("first")}
              />
              second:{" "}
              <Feild
                type="checkbox"
                name="cookies"
                value="second"
                checked={values.cookies.includes("second")}
              />
              third:{" "}
              <Feild
                type="checkbox"
                name="cookies"
                value="third"
                checked={values.cookies.includes("third")}
              />
              meetha
              <Feild type="radio" name="option" value="meetha" />
              khatta
              <Feild type="radio" name="option" value="khatta" />
              <button disabled={isSubmitting}>Submit</button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </>
          );
        }}
      </Form>
    </>
  );
}

export default LoginForm;

// {/* <Form initialState={{ name: "", password: "" }} onSubmit={onSubmit}>
//   {() => (
//     <>
//       <Feild name="name" />
//       <Feild type="password" name="password" />
//       <button>Submit</button>
//     </>
//   )}
// </Form> */}

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
