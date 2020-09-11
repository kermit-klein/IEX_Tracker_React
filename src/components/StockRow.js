import React, { useState, useEffect } from "react";
import { stock } from "../resources/stock.js";
import globalStyles from "../stylesheets/global-styles/bootstrap.module.css";
import cx from "classnames";
import styles from "../stylesheets/App.module.css";

const StockRow = (props) => {
  const [finData, setFinData] = useState({});

  const applyData = (data) => {
    setFinData(data);
  };

  useEffect(() => {
    async function fetchData() {
      if (props.date != null) {
        let data = await stock.finalData(
          props.ticker,
          stock.latestPrice,
          stock.getYesterdaysClose,
          props.date
        );
        applyData(data);
      }
    }
    fetchData();
  }, [props.date]);
  return (
    <li className={cx(globalStyles["list-group-item"])}>
      <b>{props.ticker}</b> $ {finData.price}
      <span
        className={
          finData.dollar_change > 0
            ? cx(styles.green_change)
            : cx(styles.red_change)
        }
      >
        {finData.dollar_change} (% {finData.percent_change})
      </span>
    </li>
  );
};

export default StockRow;
