import React from "react";
import useForm from "../hooks/useForm";
function Form({
  initialState,
  onSubmit,
  validators,
  onChange,
  phase2,
  children,
}) {
  const {
    state: { values },
    state: { errors },
    handleSubmit,
    valueChange,
    isSubmitting,
  } = useForm({ initialState, cb: onSubmit, validators, onChange, phase2 });

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        {children({ values, valueChange, errors, isSubmitting })}
      </form>
    </>
  );
}

// <pre>
// <br />
// name : {fullName.firstName && fullName.firstName} <br />
// <br />
// lastName : {fullName.lastName && fullName.lastName} <br />
// <br />
// {/* {console.log(errors)} */}
// firstnameError : {errors.firstName && errors.firstName} <br />
// <br />
// lastnameError : {errors.lastName && errors.lastName}
// </pre>

export default Form;
