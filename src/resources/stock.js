import { iex } from "../config/iex.js";
import axios from "axios";

export const stock = {
  latestPrice: async (ticker) => {
    const url = stock.latestPriceUrl(ticker);
    const query = await axios.get(url);
    return stock.formatPriceData(query);
  },
  latestPriceUrl: (ticker) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
  },
  formatPriceData: (data) => {
    if (Array.isArray(data.data)) {
      let stockData = data.data[data.data.length - 1];
      var formattedData = {
        price: stockData.close,
        date: stockData.date,
        time: stockData.label,
      };
    } else {
      let stockData = data.data;
      var formattedData = {
        price: stockData.close,
        date: stockData.date,
      };
    }
    return formattedData;
  },
  getYesterdaysClose: async (ticker) => {
    const url = `${iex.base_url}/stock/${ticker}/previous?token=${iex.api_token}`;
    const query = await axios.get(url);
    return stock.formatPriceData(query);
  },
  finalData: async (ticker, latest, previous) => {
    let data1 = await latest(ticker);
    let data2 = await previous(ticker);
    let lastData = {
      price: data1.price,
      date: data1.date,
      time: data1.time,
      dollar_change: parseFloat((data1.price - data2.price).toFixed(4)),
      percent_change: parseFloat(
        (((data1.price - data2.price) / data2.price) * 100).toFixed(2)
      ),
    };
    return lastData;
  },
};
