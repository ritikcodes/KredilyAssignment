import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table/Table";
import { appRoutes, appTexts } from "../../constants/constants";
import { InvoiceContext } from "../../context/centralContext";
import "./InvoicesList.css";

export default function InvoicesList() {
  const { data } = useContext(InvoiceContext);

  const columnsHead = appTexts.invoices_list.table_heads;
  const tableRowsKeys = [
    "name",
    "invoice_value",
    "due_date",
    "client_email",
    "status",
  ];

  const getStatusColor = function (id) {
    const colorMapping = {
      pending: "blue",
      paid: "Green",
      overdue: "red",
    };
    return colorMapping[id];
  };

  const customElements = {
    name: function (data) {
      return (
        <Link to={appRoutes.view_invoice.replace(":id", data.id)}>
          {data.name}
        </Link>
      );
    },
    status: function (data) {
      return (
        <div className={`column-status ${getStatusColor(data.status)}`}>
          {data.status}
        </div>
      );
    },
  };
  return (
    <div className="invoices-list">
      <h1>{appTexts.invoices_list.page_title}</h1>
      <div className="invoices-list__btn">
        <Link to={appRoutes.create_invoice}>
          <button>{appTexts.invoices_list.create_btn}</button>
        </Link>
      </div>
      <Table
        data={data}
        tableHeads={columnsHead}
        tableRows={tableRowsKeys}
        customElements={customElements}
      />
    </div>
  );
}
