import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '@core/constants';
import { HistoricalPricesResponse, InstrumentsResponse, Providers } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private readonly baseInstrumentsUrl = `${API}instruments/v1`;

  private readonly providersUrl = `${this.baseInstrumentsUrl}/providers`;
  private readonly instrumentsUrl = `${this.baseInstrumentsUrl}/instruments`;

  private readonly barsDateRangeUrl = `${API}bars/v1/bars/date-range`;
  private readonly countUrl = `${API}bars/v1/bars/count-back`;

  constructor(private http: HttpClient) {}

  getProviders(): Observable<Providers[]> {
    return this.http.get<Providers[]>(this.providersUrl);
  }

  getDateRangeData(instrumentId: string, provider: Providers): Observable<HistoricalPricesResponse> {
    let params = new HttpParams()
      .set('instrumentId', instrumentId)
      .set('provider', provider)
      .set('interval', '1')
      .set('periodicity', 'day')
      .set('startDate', '2024-06-07')
      .set('endDate', '2024-09-07');

    return this.http.get<HistoricalPricesResponse>(this.barsDateRangeUrl, { params });
  }

  getCountsBack(instrumentId: string): Observable<HistoricalPricesResponse> {
    const date = new Date().toISOString();

    let params = new HttpParams()
      .set('instrumentId', instrumentId)
      .set('provider', 'simulation')
      .set('interval', '1')
      .set('periodicity', 'day')
      .set('barsCount', '100')
      .set('date', date);

    return this.http.get<HistoricalPricesResponse>(this.countUrl, { params });
  }

  getInstruments(count: number): Observable<InstrumentsResponse> {
    const params = new HttpParams().set('size', count.toString());

    return this.http.get<InstrumentsResponse>(`${this.instrumentsUrl}`, { params });
  }
}
