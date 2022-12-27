import React from "react";

export default function TextareaToggler({
  textOnly,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="input-text-toggler">
      {textOnly ? (
        <div>{value}</div>
      ) : (
        <textarea placeholder={placeholder} onChange={onChange} />
      )}
    </div>
  );
}
