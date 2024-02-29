import { apiClient } from "./market-api-client";

const CACHE_KEY = "TradingVolume";
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function getTradingVolume(): Promise<number> {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedExpiration = localStorage.getItem(`${CACHE_KEY}_expiration`);
  if (
    cachedData &&
    cachedExpiration &&
    Date.now() < parseInt(cachedExpiration, 10)
  ) {
    return parseFloat(cachedData);
  }
  const response = await apiClient.get("/market/get-total-volume");
  localStorage.setItem(CACHE_KEY, response.data);
  localStorage.setItem(
    `${CACHE_KEY}_expiration`,
    (Date.now() + CACHE_EXPIRATION).toString()
  );
  return parseFloat(response.data);
}
