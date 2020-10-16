import React, { useContext } from "react";
import { FormCtx } from "./ReForm";

function Field({ as, type, name, value, onChange, ...props }) {
  const { values, valueChange } = useContext(FormCtx);
  const Comp = as || "input";

  return (
    <Comp
      type={type || "text"}
      name={name}
      value={value || values[name]}
      onChange={onChange || valueChange}
      // disabled={isSubmitting}
      {...props}
    />
  );
}

export default Field;
