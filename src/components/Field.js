import React from "react";

function Field({ type, className, name, value, onChange }) {
  return (
    <input
      type={type || "text"}
      className={className || ""}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default Field;
