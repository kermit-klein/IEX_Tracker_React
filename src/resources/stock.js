import { iex } from "../config/iex.js";
import axios from "axios";

export const stock = {
  latestPrice: async (ticker) => {
    const url = `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
    const query = await axios.get(url);
    return query;
  },
};
