import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import globalStyles from "./stylesheets/global-styles/bootstrap.module.css";
import cx from "classnames";
import StockRow from "./components/StockRow.js";
import styles from "./stylesheets/App.module.css";

function App() {
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
              <li
                className={cx(globalStyles["list-group-item"], styles.change)}
              >
                AAPL
              </li>
              <li className={cx(globalStyles["list-group-item"])}>AAPL</li>
              <li className={cx(globalStyles["list-group-item"])}>AAPL</li>
              <li className={cx(globalStyles["list-group-item"])}>AAPL</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
