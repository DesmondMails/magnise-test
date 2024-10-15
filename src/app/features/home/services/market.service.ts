import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { API } from '../../../core/constants';
import { InstrumentsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private readonly baseUrl = `${API}instruments/v1`;

  private readonly providersUrl = `${this.baseUrl}/providers`;
  private readonly exchangesUrl = `${this.baseUrl}/exchanges`;
  private readonly instrumentsUrl = `${this.baseUrl}/instruments`;

  constructor(private http: HttpClient) {}

  getProviders(): Observable<void> {
    return this.http.get<void>(this.providersUrl);
  }

  getExchanges(): Observable<void> {
    return this.http.get<void>(this.exchangesUrl);
  }

  getInstruments(): void {
    this.http
      .get<InstrumentsResponse>(`${this.instrumentsUrl}`)
      .pipe(
        map((res) => {
          return res.data.map((instrument) => ({
            instrumentId: instrument.id,
            currency: instrument.currency,
          }));
        }),
        tap((res) => {
          console.log('res', res);
        }),
      )
      .subscribe();
  }
}
