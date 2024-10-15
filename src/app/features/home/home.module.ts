import { NgModule } from '@angular/core';

import { HomeRouter } from './home-router.module';
import { CoreModule } from '../../core/core.module';
import { MarketService, MarketRealtimeService } from './services';
import { MarketSusbscriptionComponent } from './components';
import { HomePageComponent } from './pages';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  imports: [CoreModule, HomeRouter, MatInputModule, MatButton, ReactiveFormsModule, FlexModule],
  providers: [MarketService, MarketRealtimeService],
  declarations: [MarketSusbscriptionComponent, HomePageComponent],
})
export class HomeModule {}
