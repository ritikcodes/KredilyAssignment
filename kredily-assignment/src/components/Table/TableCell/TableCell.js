import React from "react";
import "./TableCell.css";

export default function TableCell({ className, children }) {
  return (
    <div className={`table-cell${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
