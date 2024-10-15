export interface StockMapping {
  symbol: string;
  exchange: string;
  defaultOrderSize: number;
}

export interface StockMappings {
  simulation: StockMapping;
  alpaca: StockMapping;
}

export interface Gics {
  sectorId: number;
  industryGroupId: number;
  industryId: number;
  subIndustryId: number;
}

export interface StockProfile {
  name: string;
  location: string;
  gics: Gics;
}

export interface StockData {
  id: string;
  symbol: string;
  kind: string;
  exchange: string;
  description: string;
  tickSize: number;
  currency: string;
  mappings: StockMappings;
  profile: StockProfile;
}

export interface InstrumentsResponse {
  data: StockData[];
  paging: {
    items: number;
    page: number;
    pages: number;
  };
}

export interface InstrumentsList {
  instrumentId: string;
  currency: string;
}
