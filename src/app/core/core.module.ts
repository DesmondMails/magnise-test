import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HeaderComponent} from './components'
import { AuthService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    HttpClientModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [AuthService, TokenInterceptor]
})
export class CoreModule { }
