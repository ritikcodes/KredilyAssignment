import React from "react";
import TableCell from "./TableCell/TableCell";
import "./Table.css";

export default function Table({ tableHeads, tableRows, data, customElements }) {
  return (
    <div className="table" role="table">
      <div className="table-head">
        {tableHeads.map((columnName) => (
          <TableCell key={columnName}>{columnName}</TableCell>
        ))}
      </div>
      {data.length === 0 && <div className="text-center">No data found</div>}
      {data.map((element) => (
        <div className="table-row" key={element.name}>
          {tableRows.map((row) => {
            return (
              <TableCell key={element[row]} className={row.className}>
                {customElements[row]
                  ? customElements[row](element)
                  : element[row]}
              </TableCell>
            );
          })}
        </div>
      ))}
    </div>
  );
}
