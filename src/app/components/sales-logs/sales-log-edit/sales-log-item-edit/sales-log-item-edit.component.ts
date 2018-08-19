import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Decimal } from 'decimal.js';

import { SalesLogEntry } from '../../shared/sales-log-entry.model';

// Regular expression to check that input is numeric and has at most two places beyond decimal
const DECIMAL_2 = /^[0-9]+[0-9]*(?:\.[0-9]{1,2})?$/;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-sales-log-item-edit',
  templateUrl: './sales-log-item-edit.component.html',
  styleUrls: ['./sales-log-item-edit.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    // Actually, I provide it here because I use MM/YYYY in the parent component
    // but I need MM/DD/YYYY in this component
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class SalesLogItemEditComponent implements OnInit {

  @Input()
  public index: number;

  @Input()
  public item: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  // tslint:disable-next-line:member-ordering
  static initEntryForm(entry: SalesLogEntry, entries: FormArray) {
    entries.push(
      new FormGroup({
        'stockNumber': new FormControl(entry.stockNumber, Validators.required),
        'unitType': new FormControl({value: entry.unitType, disabled: true}, Validators.required),
        'split': new FormControl(entry.split || false, Validators.required),
        'soldDate': new FormControl(entry.soldDate || null, Validators.required),
        'frontGrossAmount': new FormControl(entry.frontGrossAmount || entry.grossAmount, [
          Validators.required,
          Validators.pattern(DECIMAL_2)
        ]),
        'backGrossAmount': new FormControl(entry.backGrossAmount || 0, [
          Validators.required,
          Validators.pattern(DECIMAL_2)
        ]),
        'totalGrossAmount': new FormControl(
          {value: Decimal.add(entry.frontGrossAmount || entry.grossAmount, entry.backGrossAmount || 0), disabled: true}, [
          Validators.required,
          Validators.pattern(DECIMAL_2)
        ]),
      })
    );
  }

  onBlurStockNumber(index: number) {
    const currentRow = this.item;
    const control = currentRow.get('stockNumber');

    // If stock number has not been changed, skip the rest
    if (!control.dirty) { return; }

    // If control is dirty, convert stock number to uppercase
    const stockNumber = control.value.toUpperCase();
    if (control.value !== stockNumber) {
      control.setValue(stockNumber);
    }

    // Derive unit type based on format of stock number
    let unitType = 'New';
    // If stock number contains an alpha character anywhere but the first letter, unit is used
    if (/[A-Z]/.test(stockNumber.substr(1))) {
      unitType = 'Used';
    }
    // Set unit type
    currentRow.get('unitType').setValue(unitType);

  }

  onBlurAmount() {
    // Using decimal.js to compute amounts
    // Without decimal.js, the following caused errors with 3535.35 + 1212.12 = 4747.46999
    // currentRow.get('frontGrossAmount').value + currentRow.get('backGrossAmount').value
    const currentRow = this.item;
    const frontGross = new Decimal(currentRow.get('frontGrossAmount').value);
    const backGross = new Decimal(currentRow.get('backGrossAmount').value);
    currentRow.get('totalGrossAmount').setValue(Decimal.add(frontGross, backGross));
  }

  onDeleteEntry() {
    null;
  }

}
