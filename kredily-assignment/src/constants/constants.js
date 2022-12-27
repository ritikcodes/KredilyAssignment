import InvoiceModify from "../containers/InvoiceModify/InvoiceModify";
import InvoicesList from "../containers/InvoicesList/InvoicesList";

export const appTexts = {
  app_name: "Invoice generator",
  invoices_list: {
    page_title: "Invoices List",
    create_btn: "Create invoice",
    table_heads: ["Name", "Invoice value", "Due date", "Email ID", "Status"],
  },
  modify_invoice: {
    page_title: "Create invoice",
    invoice_view: {
      title: "Invoice",
      generated_on: "Generated on : ",
      invoice_details: "Invoice details",
      enter_charges: "Enter charges",
      add_expense_btn: "Add expense",
    },
    invoice_name: "Invoice name : ",
    due_date: "Due date : ",
    user_mail: "User mail : ",
    create_invoice_btn: "Create invoice",
  },
};

export const appRoutes = {
  invoices_list: "/",
  create_invoice: "/create-invoice",
  view_invoice: "/view-invoice/:id",
};

export const appRoutesMappedWithComponents = [
  { path: appRoutes.invoices_list, component: <InvoicesList /> },
  { path: appRoutes.create_invoice, component: <InvoiceModify /> },
  { path: appRoutes.view_invoice, component: <InvoiceModify readOnly /> },
];
