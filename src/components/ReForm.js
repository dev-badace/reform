import React, { createContext } from "react";
import useForm from "../hooks/useForm";

export const FormCtx = createContext(null);
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
  const formCtx = { values, valueChange, errors, isSubmitting, handleSubmit };
  return (
    <>
      <FormCtx.Provider value={formCtx}>
        {typeof children === "function" ? children(formCtx) : children}
      </FormCtx.Provider>
    </>
  );
}

export default Form;
