import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import { SalesLogService } from '../shared/sales-log.service';
import { SalesLog } from '../shared/sales-log.model';
import { SalesLogEntry } from '../shared/sales-log-entry.model';
import { SalesLogItemEditComponent } from './sales-log-item-edit/sales-log-item-edit.component';

import * as _moment from 'moment';
// added '"allowSyntheticDefaultImports": true' to compiler options in tsconfig.app.json to permit 'import {default...'
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { AuthService } from '../../auth/auth.service';

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

  logDate: FormControl;
  logId: string;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private salesLogService: SalesLogService,
    private authService: AuthService) { }

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
          SalesLogItemEditComponent.initEntryForm(entry, entries);
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

  getControls() {
    return (<FormArray>this.salesLogForm.get('entries')).controls;
  }

  onSubmit() {
    // Get form data including disabled fields (unit type)
    const data = this.salesLogForm.getRawValue();
    // Add ID to data; not part of form data since I don't want to display it
    data.id = this.logId;
    data.email = this.authService.getEmail();

    if (this.editMode) {
      this.salesLogService.updateSalesLog(this.idx, data);
    } else {
      this.salesLogService.addSalesLog(data);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddEntry() {
    const entry = new SalesLogEntry();
    // const entry = new SalesLogEntry('', '', false, null, 0, 0, 0);
    const entries = (<FormArray>this.salesLogForm.get('entries'));
    SalesLogItemEditComponent.initEntryForm(entry, entries);
  }

  onEntryRemoved(index: number) {
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
