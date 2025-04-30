
/**
 * Fetches the current Bitcoin price from CoinGecko API
 */
export async function fetchBitcoinPrice(): Promise<number> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch Bitcoin price");
    }
    
    const data = await response.json();
    return data.bitcoin.usd;
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    throw error;
  }
}
