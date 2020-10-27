import React, { createContext } from "react";
import useForm from "../hooks/useForm";

export const FormCtx = createContext(null);
function Form({
  initialState,
  onSubmit,
  validators,
  phase1,
  phase2,
  children,
}) {
  const {
    state: { values },
    state: { errors },
    state: { touched },
    state: { hasFailed: triedSubmit },
    handleSubmit,
    valueChange,
    isSubmitting,
    handleBlur,
  } = useForm({ initialState, cb: onSubmit, validators, phase1, phase2 });
  const formCtx = {
    values,
    valueChange,
    touched,
    errors,
    triedSubmit,
    isSubmitting,
    handleSubmit,
    handleBlur,
  };
  return (
    <>
      <FormCtx.Provider value={formCtx}>
        {typeof children === "function" ? children(formCtx) : children}
      </FormCtx.Provider>
    </>
  );
}

export default Form;
