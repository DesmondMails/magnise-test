export interface RealTimeResponses {
  type: string;
  instrumentId: string;
  provider: string;
  last: {
    timestamp: string;
    price: number;
    volume: number;
    change: number;
    changePct: number;
  };
}
