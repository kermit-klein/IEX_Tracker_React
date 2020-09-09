import React, { useState, useEffect } from "react";
import { iex } from "../config/iex.js";
import axios from "axios";
import { stock } from "../resources/stock.js";

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
    <tr>
      <td>{props.ticker}</td>
      <td>{finData.price}</td>
      <td>{finData.date}</td>
      <td>{finData.time}</td>
    </tr>
  );
};

export default StockRow;
