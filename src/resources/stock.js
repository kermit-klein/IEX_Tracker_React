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
};
