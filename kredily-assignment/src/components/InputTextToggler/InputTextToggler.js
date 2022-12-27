import React from "react";
import "./InputTextToggler.css";

export default function InputTextToggler({
  textOnly,
  value,
  type,
  onChange,
  placeholder,
}) {
  return (
    <div className="input-text-toggler">
      {textOnly ? (
        <div>{value}</div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
