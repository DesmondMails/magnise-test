import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, switchMap, tap, throwError } from 'rxjs';
import { HomeStore } from './home.store';
import { HomeQuery } from './home.query';
import { HistoricalData, StockData } from '../interfaces';
import { MarketRealtimeService, MarketService } from '../services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly historicalPriseReceivedSubject$ = new Subject<HistoricalData>();

  constructor(
    private homeQuery: HomeQuery,
    private homeStore: HomeStore,
    private marketRealtimeService: MarketRealtimeService,
    private marketService: MarketService,
    private matSnackBar: MatSnackBar,
  ) {}

  initData(): void {
    this.getAvailableProviders();
    this.getAvailableInstruments();
  }

  subscribeOnCurrency(instrumentId: string): void {
    this.setSubscriptions(instrumentId);
    this.getMarketHistoricalData(instrumentId);

    this.marketRealtimeService.sendMessage(instrumentId);

    this.homeStore.update((state) => ({
      ...state,
      instrumentsOptions: state.instrumentsOptions.filter((el) => el.value !== instrumentId),
    }));
  }

  getCurrency(instrumentId: string): string {
    return this.homeQuery.get('userSubscriptions')?.get(instrumentId) ?? '';
  }

  getHistoricalDataReceived(): Observable<HistoricalData> {
    return this.historicalPriseReceivedSubject$.asObservable();
  }

  private histoicalDataReceived(historicalData: HistoricalData): void {
    this.historicalPriseReceivedSubject$.next(historicalData);
  }

  private setSubscriptions(instrumentId: string): void {
    const selectedCurrency = this.getSelectedCurrencyRawData(instrumentId);

    const currency = selectedCurrency?.currency ?? '';

    this.homeStore.update((store) => ({
      ...store,
      userSubscriptions: store.userSubscriptions.set(instrumentId, currency),
    }));
  }

  private getMarketHistoricalData(instrumentId: string): void {
    //I've thought that will help to select data for all currencies

    // const selectedCurrency = this.getSelectedCurrencyRawData(instrumentId);
    // const availableProviders = Object.keys({ ...selectedCurrency?.mappings }) as Providers[];

    // const availableProvider = availableProviders?.find((value) => value === 'oanda') ?? availableProviders[0];

    this.marketService
      .getCountsBack(instrumentId)
      .pipe(
        catchError((err) => {
          this.matSnackBar.open(err?.error?.error?.message ?? 'Uknown error occured', 'error', { duration: 4000 });

          return throwError(() => new Error(err));
        }),
      )
      .subscribe((historicalPrices) => {
        const historicalData: HistoricalData = {
          currency: this.getCurrency(instrumentId),
          data: historicalPrices.data,
        };

        this.histoicalDataReceived(historicalData);
      });
  }

  private getAvailableInstruments(): void {
    this.marketService
      .getInstruments(1)
      .pipe(
        switchMap((res) => {
          const { items: itemsCount } = res.paging;

          return this.marketService.getInstruments(itemsCount);
        }),
        map((allDataRes) => {
          const uniqueInstruments = this.filterUniqueCurrencies(allDataRes.data);

          const uniqueInstrumentsOptions = uniqueInstruments.map((instrument) => ({
            value: instrument.id,
            name: `${instrument.currency}`,
          }));

          return { uniqueInstruments, uniqueInstrumentsOptions };
        }),
        tap(({ uniqueInstruments, uniqueInstrumentsOptions }) => {
          this.homeStore.update({
            instrumentsRawData: uniqueInstruments,
            instrumentsOptions: uniqueInstrumentsOptions,
          });
        }),
      )
      .subscribe();
  }

  private getAvailableProviders(): void {
    this.marketService.getProviders().subscribe((providers) => {
      this.homeStore.update({ providers });
    });
  }

  private filterUniqueCurrencies(instruments: StockData[]): StockData[] {
    const checkedCurrencies = new Set<string>();

    return instruments.filter((instrument) => {
      if (checkedCurrencies.has(instrument.currency)) {
        return false;
      } else {
        checkedCurrencies.add(instrument.currency);
        return true;
      }
    });
  }

  private getSelectedCurrencyRawData(instrumentId: string): StockData | undefined {
    return this.homeQuery.get('instrumentsRawData')?.find((el) => el.id === instrumentId);
  }
}
