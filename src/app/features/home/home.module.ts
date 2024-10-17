import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { MatButton } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BaseChartDirective } from 'ng2-charts';

import { SharedModule } from '@shared/shared.module';

import { HomeService } from './state';
import { HomePageComponent } from './pages';
import { HomeRouter } from './home-router.module';
import { MarketService, MarketRealtimeService } from './services';
import { MarketSusbscriptionComponent, MarketTableComponent, MarketChartComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    HomeRouter,
    MatButton,
    FlexModule,
    SharedModule,
    MatTableModule,
    BaseChartDirective,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  providers: [MarketService, MarketRealtimeService, HomeService],
  declarations: [MarketSusbscriptionComponent, MarketTableComponent, MarketChartComponent, HomePageComponent],
})
export class HomeModule {}
