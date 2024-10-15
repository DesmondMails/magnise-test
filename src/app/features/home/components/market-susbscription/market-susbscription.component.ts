import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MarketRealtimeService, MarketService } from '../../services';

@Component({
  selector: 'app-market-susbscription',
  templateUrl: './market-susbscription.component.html',
  styleUrls: ['./market-susbscription.component.scss'],
})
export class MarketSusbscriptionComponent implements OnInit {
  inputControl = new FormControl('');

  constructor(private marketService: MarketService, private marketRealtimeService: MarketRealtimeService) {}

  ngOnInit() {
    this.marketService.getProviders().subscribe((res) => {
      console.log('res', res);
    });

    this.marketService.getExchanges().subscribe((res) => {
      console.log('exhanges res', res);
    });

    this.marketService.getInstruments();
  }
}
