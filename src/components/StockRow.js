import React, { useState, useEffect } from "react";
import { iex } from "../config/iex.js";
import { stock } from "../resources/stock.js";
import globalStyles from "../stylesheets/global-styles/bootstrap.module.css";
import cx from "classnames";
import styles from "../stylesheets/App.module.css";

const StockRow = (props) => {
  const [finData, setFinData] = useState({});

  const applyData = (data) => {
    setFinData(data);
  };

  useEffect(async () => {
    const url = `${iex.base_url}/stock/${props.ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
    // fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setFinData(data[data.length - 1]);
    //   });
    let data = await stock.latestPrice(props.ticker);
    applyData(data);
    // try {
    //   let response = await axios.get(url);
    //   setFinData(response.data[response.data.length - 1]);
    // } catch (err) {
    //   console.log(err);
    // }
  }, []);

  return (
    <li className={cx(globalStyles["list-group-item"])}>
      <b>{props.ticker}</b> $ {finData.price}
      <span className={cx(styles.change)}>+12 (%5)</span>
    </li>
  );
};

export default StockRow;
