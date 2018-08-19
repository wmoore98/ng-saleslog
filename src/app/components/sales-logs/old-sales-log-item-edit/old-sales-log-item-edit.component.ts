import { Component, OnInit, Input } from '@angular/core';
import { SalesLogEntry } from '../shared/sales-log-entry.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SalesLogService } from '../shared/sales-log.service';

const DECIMAL_2 = /^[0-9]+[0-9]*(?:\.[0-9]{1,2})?$/;

@Component({
  selector: 'app-sales-log-item-edit',
  templateUrl: './sales-log-item-edit.component.html',
  styleUrls: ['./sales-log-item-edit.component.css']
})
export class OldSalesLogItemEditComponent implements OnInit {

  @Input() editItem: SalesLogEntry;
  // editItem: SalesLogEntry;
  salesLogItemForm: FormGroup;
  editMode = true;

  constructor(private salesLogService: SalesLogService) { }

  ngOnInit() {
    this.initForm();
    this.salesLogService.salesLogItemEdited
      .subscribe(
        (salesLogEntry: SalesLogEntry) => {
          this.editItem = salesLogEntry;
          this.initForm();
        }
      );
  }

  initForm() {
    let stockNumber = '';
    let frontGrossAmount = 0;
    let backGrossAmount = 0;
    let unitType = '';

    if (this.editMode) {
      stockNumber = this.editItem.stockNumber;
      unitType = this.editItem.unitType;
      frontGrossAmount = this.editItem.frontGrossAmount || this.editItem.grossAmount;
      backGrossAmount = this.editItem.backGrossAmount || 0;
      // const salesLog = this.salesLogService.getSalesLog(this.idx);
      // id = salesLog.id;
      // description = salesLog.description;
      // if (salesLog['entries']) {
      //   for (const entry of salesLog.entries) {
      //     entries.push(
      //       new FormGroup({
      //         'stockNumber': new FormControl(entry.stockNumber, Validators.required),
      //         'grossAmount': new FormControl(entry.grossAmount, [
      //           Validators.required,
      //           Validators.pattern(DECIMAL_2)
      //         ]),
      //         'unitType': new FormControl(entry.unitType || 'New')
      //       })
      //     );
      //   }
      // }
    }

    this.salesLogItemForm = new FormGroup({
      'stockNumber': new FormControl(stockNumber, Validators.required),
      'unitType': new FormControl(unitType || 'New'),
      'frontGrossAmount': new FormControl(frontGrossAmount, [
        Validators.required,
        Validators.pattern(DECIMAL_2)
      ]),
      'backGrossAmount': new FormControl(backGrossAmount, [
        Validators.required,
        Validators.pattern(DECIMAL_2)
      ]),
      'totalGrossAmount': new FormControl({value: frontGrossAmount + backGrossAmount, disabled: true}, [
        Validators.pattern(DECIMAL_2)
      ]),
    });

  }

  onBlurStockNumber(control: FormControl) {
    if (!control.dirty) { return; }

    const stockNumber = control.value.toUpperCase();
    if (control.value !== stockNumber) {
      control.setValue(stockNumber);
    }

    let unitType = 'New';
    if (/[A-Z]/.test(stockNumber.substr(1))) {
      unitType = 'Used';
    }
    this.salesLogItemForm.controls['unitType'].setValue(unitType);
    // console.log(control);
  }

  onBlurAmount() {
    this.salesLogItemForm.controls['totalGrossAmount'].setValue(
      this.salesLogItemForm.controls['frontGrossAmount'].value +
      this.salesLogItemForm.controls['backGrossAmount'].value
    );
  }

}
