import React, { useContext, useEffect, useState } from "react";
import InputTextToggler from "../../components/InputTextToggler/InputTextToggler";
import SelectTextToggler from "../../components/SelectTextToggler/SelectTextToggler";
import TextareaToggler from "../../components/TextareaToggler/TextareaToggler";
import { appRoutes, appTexts } from "../../constants/constants";
import { InvoiceContext } from "../../context/centralContext";
import { useNavigate, useParams } from "react-router-dom";

import "./InvoiceModify.css";

//Renders view/create invoice
export default function InvoiceModify({ readOnly }) {
  const isEditModeEnabled = !readOnly;
  let { id } = useParams();

  const generatedOn = useState(new Date().toLocaleDateString());

  let history = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [userMail, setUserMail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const { pushInvoice, getInvoiceDetails } = useContext(InvoiceContext);

  function onUserMailChange(e) {
    setUserMail(e.target.value);
  }

  function onExpenseChange(e, index) {
    let nextExpenses = [...expenses];
    nextExpenses[index] = { ...nextExpenses[index], id: e.target.value };
    return setExpenses(nextExpenses);
  }

  function onExpenseRateChange(e, index) {
    let nextExpenses = [...expenses];
    nextExpenses[index] = { ...nextExpenses[index], rate: e.target.value };
    return setExpenses(nextExpenses);
  }

  function onNoteChangeHandler(e) {
    setNotes(e.target.value);
  }

  function onDueDateChange(e) {
    setDueDate(e.target.value);
  }

  function onCreateInvoiceHandler() {
    pushInvoice({
      name,
      expenses,
      notes,
      client_email: userMail,
      status:
        new Date(dueDate).getTime() < new Date().getTime()
          ? "overdue"
          : "pending",
      due_date: dueDate,
      invoice_value: expenses.reduce((acc, element) => {
        return acc + parseInt(element.rate);
      }, 0),
    });
    history(appRoutes.invoices_list);
  }

  function onInvoiceNameChange(e) {
    return setName(e.target.value);
  }

  useEffect(() => {
    if (readOnly) {
      let data = getInvoiceDetails(id);
      let { due_date, client_email, expenses, name, notes } = data;

      setName(name);
      setDueDate(due_date);
      setUserMail(client_email);
      setExpenses(expenses);
      setNotes(notes);
    }
  }, []);

  return (
    <section>
      <h1>{readOnly ? name : appTexts.modify_invoice.page_title}</h1>
      <div className="invoice-modify">
        <div className="invoice-head">
          <h1>{appTexts.modify_invoice.invoice_view.title}</h1>
          <span>
            {appTexts.modify_invoice.invoice_view.generated_on}
            <InputTextToggler value={generatedOn} type="date" textOnly />
          </span>
        </div>
        <div className="invoice-details">
          <h3>{appTexts.modify_invoice.invoice_view.invoice_details}</h3>
          <hr />

          <div className="invoice-details__expenses">
            {expenses.map((ele, index) => {
              return (
                <div>
                  <SelectTextToggler
                    onChange={(e) => onExpenseChange(e, index)}
                    defaultValue={ele.id}
                    textOnly={!isEditModeEnabled}
                  />

                  <InputTextToggler
                    onChange={(e) => onExpenseRateChange(e, index)}
                    textOnly={!isEditModeEnabled}
                    type="text"
                    value={ele.rate}
                    placeholder={
                      appTexts.modify_invoice.invoice_view.enter_charges
                    }
                  />
                </div>
              );
            })}
          </div>
          {isEditModeEnabled && (
            <button
              onClick={function () {
                setExpenses([...expenses, { id: "1", rate: "" }]);
              }}
            >
              {appTexts.modify_invoice.invoice_view.add_expense_btn}
            </button>
          )}
          <div className="invoice-details__notes">
            <TextareaToggler
              textOnly={!isEditModeEnabled}
              placeholder="Enter notes"
              value={notes}
              onChange={onNoteChangeHandler}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <b>{appTexts.modify_invoice.invoice_name} </b>
          <InputTextToggler
            onChange={onInvoiceNameChange}
            textOnly={!isEditModeEnabled}
            type="text"
            value={name}
          />
        </div>
        <br />
        <div>
          <b>{appTexts.modify_invoice.due_date} </b>
          <InputTextToggler
            onChange={onDueDateChange}
            textOnly={!isEditModeEnabled}
            type="date"
            value={dueDate}
          />
        </div>
        <br />
        <div>
          <b>{appTexts.modify_invoice.user_mail} </b>
          <InputTextToggler
            onChange={onUserMailChange}
            textOnly={!isEditModeEnabled}
            type="text"
            value={userMail}
            placeholder="Enter email id"
          />
        </div>
      </div>
      {isEditModeEnabled && (
        <div className="invoice-modify__btns">
          <button onClick={onCreateInvoiceHandler}>
            {appTexts.modify_invoice.create_invoice_btn}
          </button>
        </div>
      )}
    </section>
  );
}
