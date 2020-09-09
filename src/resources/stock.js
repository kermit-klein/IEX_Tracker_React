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
    let stockData = data.data[data.data.length - 1];
    let formattedData = {
      price: stockData.close,
      date: stockData.date,
      time: stockData.label,
    };
    return formattedData;
  },
  getYesterdaysClose: async (ticker, date) => {
    const url = stock.yesterdaysCloseUrl(ticker, date);
    const query = await axios.get(url);
    return stock.formatPriceData(query);
  },
  yesterdaysCloseUrl: (ticker, date) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&exactDate=20200909&token=${iex.api_token}`;
  },
  finalData: async (ticker, latest, previous, date) => {
    let data1 = await latest(ticker);
    let data2 = await previous(ticker, date);
  },
};
