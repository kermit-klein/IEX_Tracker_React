import React, { useState, useEffect } from "react";
import { iex } from "../config/iex.js";

const StockRow = (props) => {
  const [finData, setFinData] = useState({});

  useEffect(() => {
    const url = `${iex.base_url}/stock/${props.ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFinData(data[data.length - 1]);
      });
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
