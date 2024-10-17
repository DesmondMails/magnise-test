export interface HistoricalPrices {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

export interface HistoricalPricesResponse {
  data: HistoricalPrices[];
}

export interface HistoricalData {
  currency: string;
  data: HistoricalPrices[];
}
