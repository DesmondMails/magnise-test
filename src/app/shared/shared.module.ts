import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule } from '@angular/common';
import { WebSocketService } from './services';
import { AutocompleteInputComponent } from './components';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    AsyncPipe,
  ],
  providers: [WebSocketService],
  declarations: [AutocompleteInputComponent],
  exports: [AutocompleteInputComponent],
})
export class SharedModule {}
