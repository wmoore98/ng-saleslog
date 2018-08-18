import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Decimal } from 'decimal.js';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import { SalesLogService } from '../shared/sales-log.service';
import { SalesLog } from '../shared/sales-log.model';
import { SalesLogEntry } from '../shared/sales-log-entry.model';

import * as _moment from 'moment';
// added '"allowSyntheticDefaultImports": true' to compiler options in tsconfig.app.json to permit 'import {default...'
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const DECIMAL_2 = /^[0-9]+[0-9]*(?:\.[0-9]{1,2})?$/;

@Component({
  selector: 'app-sales-log-edit',
  templateUrl: './sales-log-edit.component.html',
  styleUrls: ['./sales-log-edit.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SalesLogEditComponent implements OnInit {

  idx: number;
  editMode = false;
  salesLogForm: FormGroup;


  // logDate = new FormControl(moment());
  logDate: FormControl;
  logId: string;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private salesLogService: SalesLogService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) =>  {
          this.idx = +params['id'];
          this.editMode = params['id'] !== undefined;
          this.initForm();
        });
  }

  initForm() {
    // Default to current year and month
    let logDate: Moment = moment();
    let logId = '';

    const entries = new FormArray([]);

    if (this.editMode) {
      const salesLog: SalesLog = this.salesLogService.getSalesLog(this.idx);
      // Derive log date from log id
      logId = salesLog.id;
      logDate = moment(logId);
      if (salesLog['entries']) {
        for (const entry of salesLog.entries) {
          this.initEntryForm(entry, entries);
        }
      }
    }

    this.logDate = new FormControl(logDate);
    this.logId = logDate.format('YYYY-MM');

    this.salesLogForm = new FormGroup({
      // 'id': new FormControl({value: logId, disabled: true}, Validators.required),
      'entries': entries
    });

  }

  initEntryForm(entry: SalesLogEntry, entries: FormArray) {
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

  getUnitType(index: number) {
    return (<FormArray>this.salesLogForm.get('entries')).at(index).get('unitType').value;
  }

  onBlurStockNumber(index: number) {
    const currentRow = (<FormArray>this.salesLogForm.get('entries')).at(index);
    const control = currentRow.get('stockNumber');
    if (!control.dirty) { return; }

    // If control is dirty, convert stock number to uppercase
    const stockNumber = control.value.toUpperCase();
    if (control.value !== stockNumber) {
      control.setValue(stockNumber);
    }

    // Derive unit type based on format of stock number
    let unitType = 'New';
    if (/[A-Z]/.test(stockNumber.substr(1))) {
      unitType = 'Used';
    }
    // Set unit type
    currentRow.get('unitType').setValue(unitType);

  }

  onBlurAmount(index: number) {
    // The following caused errors with something as simple as 3535.35 + 1212.12 = 4747.46999
    // currentRow.get('frontGrossAmount').value + currentRow.get('backGrossAmount').value
    // So using decimal.js
    const currentRow = (<FormArray>this.salesLogForm.get('entries')).at(index);
    const frontGross = new Decimal(currentRow.get('frontGrossAmount').value);
    const backGross = new Decimal(currentRow.get('backGrossAmount').value);
    currentRow.get('totalGrossAmount').setValue(Decimal.add(frontGross, backGross));
  }

  getControls() {
    return (<FormArray>this.salesLogForm.get('entries')).controls;
  }


  onSubmit() {
    // Get form data including disabled fields (unit type)
    const data = this.salesLogForm.getRawValue();
    // Add ID to data; not part of form data since I don't want to display it
    data.id = this.logId;

    if (this.editMode) {
      this.salesLogService.updateSalesLog(this.idx, data);
    } else {
      this.salesLogService.addSalesLog(data);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddEntry() {
    this.initEntryForm(new SalesLogEntry('', '', false, null, 0, 0, 0), (<FormArray>this.salesLogForm.get('entries')));
  }

  onDeleteEntry(index: number) {
    (<FormArray>this.salesLogForm.get('entries')).removeAt(index);
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.logDate.value;
    ctrlValue.year(normalizedYear.year());
    this.logDate.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.logDate.value;
    ctrlValue.year(normalizedMonth.year());
    ctrlValue.month(normalizedMonth.month());
    this.logDate.setValue(ctrlValue);
    this.logId = this.logDate.value.format('YYYY-MM');
    datepicker.close();
  }

}
