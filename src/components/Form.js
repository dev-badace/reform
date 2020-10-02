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

  return (
    <>
      <form {...props} onSubmit={(e) => handleSubmit(e)} autoComplete="off">
        <FormCtx.Provider value={{ values, valueChange, errors, isSubmitting }}>
          {children({ values, valueChange, errors, isSubmitting })}
        </FormCtx.Provider>
      </form>
    </>
  );
}

export default Form;
