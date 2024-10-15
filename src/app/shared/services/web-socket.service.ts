import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private wsUrl = environment.wssUrl;

  private socket$!: WebSocketSubject<any>;

  constructor(private authService: AuthService) {}

  connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      const token = this.authService.getToken();

      const socketUrl = `${this.wsUrl}?token=${token}`;

      this.socket$ = new WebSocketSubject({
        url: socketUrl,
        openObserver: {
          next: () => {
            console.info('WebSocket connection established');
          },
        },
        closeObserver: {
          next: (closeEvent) => {
            console.info('WebSocket connection closed: ', closeEvent);
          },
        },
      });
    }
  }

  listen(): Observable<any> {
    return this.socket$.asObservable();
  }

  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  close(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
