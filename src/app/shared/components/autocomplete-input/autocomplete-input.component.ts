import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AutocompleteOption } from '@shared/interfaces';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
})
export class AutocompleteInputComponent implements OnInit {
  @Input() availableOptions: AutocompleteOption[] = [];
  @Input() placeholder: string = '';

  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  selectControl = new FormControl('', Validators.required);

  filteredOptions!: Observable<AutocompleteOption[]>;

  ngOnInit(): void {
    this.filteredOptions = this.selectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterOptions(value || '')),
    );
  }

  onOptionSelected(value: string): void {
    this.optionSelected.emit(value);
  }

  private _filterOptions(value: string): AutocompleteOption[] {
    const filterValue = value.toLowerCase();

    return this.availableOptions.filter((option) => option.name.toLowerCase().includes(filterValue));
  }
}
