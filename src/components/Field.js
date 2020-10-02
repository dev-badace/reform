import React, { useContext } from "react";
import { FormCtx } from "./Form";

function Field({ type, name, value, onChange, ...props }) {
  const { values, valueChange } = useContext(FormCtx);

  return (
    <input
      type={type || "text"}
      name={name}
      value={value || values[name]}
      onChange={onChange || valueChange}
      {...props}
    />
  );
}

export default Field;
