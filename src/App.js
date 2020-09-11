import React, { useEffect, useState } from "react";
import { stock } from "./resources/stock.js";
import "bootstrap/dist/css/bootstrap.min.css";
import globalStyles from "./stylesheets/global-styles/bootstrap.module.css";
import cx from "classnames";
import StockRow from "./components/StockRow.js";

function App() {
  const [lastTradingDate, setLastTradingDate] = useState(null);

  useEffect(() => {
    async function fetchDate() {
      let date = new Date().toISOString().split("T")[0];
      date = await stock.getLastBankDayDate(date);
      setLastTradingDate(date);
    }
    fetchDate();
  }, []);

  return (
    <div className="App">
      <div className={cx(globalStyles.container)}>
        <div className={cx(globalStyles["col-md-5"], globalStyles["mt-5"])}>
          <div className={cx(globalStyles.card)}>
            <ul
              className={cx(
                globalStyles["list-group"],
                globalStyles["list-group-flush"]
              )}
            >
              <StockRow ticker="aapl" date={lastTradingDate} />
              <StockRow ticker="goog" date={lastTradingDate} />
              <StockRow ticker="msft" date={lastTradingDate} />
              <StockRow ticker="tsla" date={lastTradingDate} />
              <StockRow ticker="grub" date={lastTradingDate} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
