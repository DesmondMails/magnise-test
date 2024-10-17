import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarketRealtimeService } from '@features/home/services';
import { HomeService } from '@features/home/state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(private homeService: HomeService, private marketRealtimeService: MarketRealtimeService) {}

  ngOnInit(): void {
    this.homeService.initData();
    this.marketRealtimeService.startConnection();
  }

  ngOnDestroy(): void {
    this.marketRealtimeService.closeConnection();
  }
}
