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
    const url = await stock.yesterdaysCloseUrl(ticker, date);
    const query = await axios.get(url);
    return stock.formatPriceData(query);
  },
  yesterdaysCloseUrl: async (ticker, date) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&exactDate=${date}&token=${iex.api_token}`;
  },
  finalData: async (ticker, latest, previous, date) => {
    let data1 = await latest(ticker);
    let data2 = await previous(ticker, date);
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
  getLastBankDayDate: async (date) => {
    let today = new Date(date).toISOString().split("T")[0].replace(/-/g, "");
    const url = `${iex.base_url}/ref-data/us/dates/trade/last/1/${today}?token=${iex.api_token}`;
    let lastBankDay = await axios.get(url);
    return lastBankDay.data[0].date.replace(/-/g, "");
  },
};
