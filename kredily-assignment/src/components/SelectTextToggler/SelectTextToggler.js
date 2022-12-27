import React from "react";

export default function SelectTextToggler({
  textOnly,
  defaultValue,
  onChange,
}) {
  let options = {
    1: "Hours of work",
    2: "Expenses",
    3: "Materials",
    4: "Labour Charges",
  };

  return (
    <div className="input-text-toggler">
      {textOnly ? (
        <div>{options[defaultValue]}</div>
      ) : (
        <select onChange={onChange} defaultValue={defaultValue}>
          {Object.entries(options).map(([key, value]) => {
            return <option value={key}>{value}</option>;
          })}
        </select>
      )}
    </div>
  );
}
