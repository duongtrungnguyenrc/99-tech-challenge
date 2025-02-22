import { TokenPrice } from "../types";

export async function fetchPrices(): Promise<TokenPrice[]> {
  try {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    const data = await response.json();
    return data.filter((token: TokenPrice) => token.price > 0);
  } catch (error) {
    console.error("Error fetching prices:", error);
    return [];
  }
}
