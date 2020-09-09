import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import StockRow from "./components/StockRow.js";

function App() {
  return (
    <div className="App">
      <div className="container">
        <table className="table mt-9">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Price</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <StockRow ticker="aapl" />
            <StockRow ticker="goog" />
            <StockRow ticker="msft" />
            <StockRow ticker="tsla" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
