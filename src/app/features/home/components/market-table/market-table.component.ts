import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MARKET_TABLE_LENGTH } from '@features/home/constants';
import { MarketTableRow } from '@features/home/interfaces';
import { MarketRealtimeService } from '@features/home/services';
import { HomeService } from '@features/home/state';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@UntilDestroy()
@Component({
  selector: 'app-market-table',
  templateUrl: './market-table.component.html',
  styleUrls: ['./market-table.component.scss'],
})
export class MarketTableComponent implements OnInit {
  readonly displayedColumns: string[] = ['symbol', 'price', 'timestamp'];

  data: MarketTableRow[] = [];

  dataSource = new MatTableDataSource<MarketTableRow>([]);

  constructor(private marketRealtimeService: MarketRealtimeService, private homeService: HomeService) {}

  ngOnInit(): void {
    this.subscribeToMarketMessages();
  }

  private subscribeToMarketMessages(): void {
    this.marketRealtimeService
      .listenMarketMessages()
      .pipe(untilDestroyed(this))
      .subscribe((message) => {
        const { instrumentId } = message;

        const { price, timestamp } = message.last;

        const symbol = this.homeService.getCurrency(instrumentId);

        const newRow: MarketTableRow = {
          symbol,
          price,
          timestamp,
        };

        this.setTableData(newRow);
      });
  }

  private setTableData(newRow: MarketTableRow): void {
    const dataLength = this.data.unshift(newRow);

    const isLengthAboveRestrictions = dataLength >= MARKET_TABLE_LENGTH;

    if (isLengthAboveRestrictions) {
      this.data.pop();
    }

    this.dataSource = new MatTableDataSource(this.data);
  }
}
