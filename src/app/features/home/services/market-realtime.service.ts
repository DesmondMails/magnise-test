import { Injectable } from '@angular/core';
import { debounce, filter, Observable } from 'rxjs';
import { WebSocketService } from '@shared/services';
import { RealTimeResponses } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MarketRealtimeService {
  constructor(private webSocketSerive: WebSocketService<RealTimeResponses>) {}

  startConnection(): void {
    this.webSocketSerive.connect();
  }

  listenMarketMessages(): Observable<RealTimeResponses> {
    return this.webSocketSerive.listen().pipe(
      filter((res) => {
        return !!res?.last;
      }),
    );
  }

  sendMessage(instrumentId: string): void {
    const body = {
      type: 'l1-subscription',
      id: '1',
      instrumentId,
      provider: 'simulation',
      subscribe: true,
      kinds: ['last'],
    };

    this.webSocketSerive.sendMessage(body);
  }

  closeConnection(): void {
    this.webSocketSerive.close();
  }
}
