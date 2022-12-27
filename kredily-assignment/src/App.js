import { Routes, Route, BrowserRouter } from "react-router-dom";
import { appRoutesMappedWithComponents, appTexts } from "./constants/constants";
import "./App.css";
import { InvoiceContext } from "./context/centralContext";
import { useState } from "react";

function App() {
  const [data, setData] = useState([
    {
      name: "Overdue invoice",
      expenses: [
        {
          id: "1",
          rate: "10",
        },
        {
          id: "3",
          rate: "200",
        },
      ],
      notes: "Pay @ paybill.com",
      client_email: "mailcritik@gmail.com",
      status: "overdue",
      due_date: "2022-12-09",
      invoice_value: "210",
      id: 0,
    },
    {
      name: "To be paid invoice",
      expenses: [
        {
          id: "1",
          rate: "3",
        },
        {
          id: "4",
          rate: "6",
        },
      ],
      notes: "to be paid@fsaf.com",
      client_email: "email.com",
      status: "pending",
      due_date: "2023-01-07",
      invoice_value: 9,
      id: 1,
    },
  ]);

  function pushInvoice(newInvoice) {
    return setData([...data, { ...newInvoice, id: data.length }]);
  }

  function getInvoiceDetails(id) {
    return data[id];
  }

  return (
    <InvoiceContext.Provider value={{ data, pushInvoice, getInvoiceDetails }}>
      <BrowserRouter>
        <div className="App">
          <header>{appTexts.app_name}</header>
          <div className="app-container">
            <Routes>
              {appRoutesMappedWithComponents.map((element) => {
                return (
                  <Route
                    path={element.path}
                    element={element.component}
                    key={element.path}
                  />
                );
              })}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </InvoiceContext.Provider>
  );
}

export default App;
