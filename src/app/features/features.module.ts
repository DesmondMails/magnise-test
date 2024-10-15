import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { FeaturesRouter } from './features-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CoreModule, FeaturesRouter, SharedModule],
})
export class FeaturesModule {}
