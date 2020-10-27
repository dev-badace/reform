import React, { useContext } from "react";
import { FormCtx } from "./ReForm";

function Field({ as, type, name, value, onChange, ...props }) {
  const {
    values,
    valueChange,
    handleBlur,
    touched,
    errors,
    triedSubmit,
  } = useContext(FormCtx);
  const Comp = as || "input";

  return (
    <Comp
      type={type || "text"}
      name={name}
      touched={touched[name] || false}
      value={value || values[name]}
      onChange={onChange || valueChange}
      onBlur={handleBlur}
      error={errors[name]}
      triedSubmit={triedSubmit}
      {...props}
    />
  );
}

export default Field;
