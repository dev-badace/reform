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
  ...props
}) {
  const {
    state: { values },
    state: { errors },
    handleSubmit,
    valueChange,
    isSubmitting,
  } = useForm({ initialState, cb: onSubmit, validators, onChange, phase2 });
  // const formCtx = { values, valueChange, errors, isSubmitting, handleSubmit };
  return (
    <>
      <FormCtx.Provider
        value={(values, valueChange, errors, isSubmitting, handleSubmit)}
      >
        <form {...props} onSubmit={(e) => handleSubmit(e)} autoComplete="off">
          {children({ values, valueChange, errors, isSubmitting })}
        </form>
      </FormCtx.Provider>
    </>
  );
}

export default Form;
