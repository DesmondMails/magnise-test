import { Injectable } from '@angular/core';
import { WebSocketService } from '../../../shared/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketRealtimeService {
  constructor(private webSocketSerive: WebSocketService) {}

  startConnection(): void {
    this.webSocketSerive.connect();

    this.sendMessage();
  }

  listenSockets(): Observable<void> {
    return this.webSocketSerive.listen();
  }

  private sendMessage(): void {
    this.webSocketSerive.sendMessage({
      type: 'l1-subscription',
      id: '1',
      instrumentId: 'ad9e5345-4c3b-41fc-9437-1d253f62db52',
      provider: 'simulation',
      subscribe: true,
      kinds: ['ask', 'bid', 'last'],
    });
  }
}
