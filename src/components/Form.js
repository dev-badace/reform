import React, { useContext } from "react";
import { FormCtx } from "./ReForm";

function Form({ children, as, ...props }) {
  const { handleSubmit, errors, isSubmitting, values } = useContext(FormCtx);
  const Comp = as || "form";
  return (
    <Comp {...props} onSubmit={handleSubmit}>
      {typeof children === "function"
        ? children({ errors, isSubmitting, values })
        : children}
    </Comp>
  );
}

export default Form;
