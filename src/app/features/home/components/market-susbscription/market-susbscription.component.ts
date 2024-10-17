import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AutocompleteInputComponent } from '@shared/components';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { InstrumentOptions } from '@features/home/interfaces';
import { HomeQuery, HomeService } from '@features/home/state';

@UntilDestroy()
@Component({
  selector: 'app-market-susbscription',
  templateUrl: './market-susbscription.component.html',
  styleUrls: ['./market-susbscription.component.scss'],
})
export class MarketSusbscriptionComponent implements AfterViewInit {
  @ViewChild(AutocompleteInputComponent) autocompleteInput!: AutocompleteInputComponent;

  inputControl = new FormControl('', Validators.required);

  selectedInstrumentId: string = '';

  availableInstruments: InstrumentOptions[] = [];

  constructor(private homeQuery: HomeQuery, private cd: ChangeDetectorRef, private homeService: HomeService) {
    this.susbscribeOnInstrumentOptions();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  onCurrencySelected(instrumentId: string): void {
    this.selectedInstrumentId = instrumentId;
  }

  onSubscriptionClick(): void {
    this.homeService.subscribeOnCurrency(this.selectedInstrumentId);
  }

  isAutocompleteValid(): boolean {
    return this.autocompleteInput?.selectControl?.valid;
  }

  private susbscribeOnInstrumentOptions(): void {
    this.homeQuery.instrumentsOptions$.pipe(untilDestroyed(this)).subscribe((instrumentsOptions) => {
      this.availableInstruments = instrumentsOptions;

      this.cd.markForCheck();
    });
  }
}
