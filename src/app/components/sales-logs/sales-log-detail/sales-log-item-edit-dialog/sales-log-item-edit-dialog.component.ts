import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SalesLogEntry } from '../../shared/sales-log-entry.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Decimal } from 'decimal.js';

export interface DialogData {
  // index: number;
  salesLogEntry: SalesLogEntry;
}

const DECIMAL_2 = /^[0-9]+[0-9]*(?:\.[0-9]{1,2})?$/;

@Component({
  selector: 'app-sales-log-item-edit-dialog',
  templateUrl: './sales-log-item-edit-dialog.component.html',
  styleUrls: ['./sales-log-item-edit-dialog.component.css']
})
export class SalesLogItemEditDialogComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SalesLogItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.initEntryForm(this.data.salesLogEntry);
  }

  initEntryForm(entry: SalesLogEntry) {
    this.itemForm = new FormGroup({
      'stockNumber': new FormControl(entry.stockNumber, Validators.required),
      'unitType': new FormControl({value: entry.unitType, disabled: true}, Validators.required),
      'split': new FormControl(entry.split || false, Validators.required),
      'soldDate': new FormControl(entry.soldDate || null, Validators.required),
      'frontGrossAmount': new FormControl(entry.frontGrossAmount || 0, [
        Validators.required,
        Validators.pattern(DECIMAL_2)
      ]),
      'backGrossAmount': new FormControl(entry.backGrossAmount || 0, [
        Validators.required,
        Validators.pattern(DECIMAL_2)
      ]),
      'totalGrossAmount': new FormControl(
        {value: Decimal.add(entry.frontGrossAmount || 0, entry.backGrossAmount || 0), disabled: true}, [
        Validators.required,
        Validators.pattern(DECIMAL_2)
      ]),
      'customerName': new FormControl(entry.customerName),
      'deskManager': new FormControl(entry.deskManager),
      'financeManager': new FormControl(entry.financeManager),
      'notes': new FormControl(entry.notes)
    });
  }

  onBlurStockNumber() {
    const currentItem = this.itemForm;
    const control = currentItem.get('stockNumber');

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
    currentItem.get('unitType').setValue(unitType);

  }

  onBlurAmount() {
    // Using decimal.js to compute amounts
    // Without decimal.js, the following caused errors with 3535.35 + 1212.12 = 4747.46999
    // currentRow.get('frontGrossAmount').value + currentRow.get('backGrossAmount').value
    const currentItem = this.itemForm;
    const frontGross = new Decimal(currentItem.get('frontGrossAmount').value);
    const backGross = new Decimal(currentItem.get('backGrossAmount').value);
    currentItem.get('totalGrossAmount').setValue(Decimal.add(frontGross, backGross));
  }

  // Emit 'removed' event with the index of the entry that is being removed
  // Parent component will handle removing entry
  onDeleteEntry() {
    // this.removed.emit(this.index);
  }

  onSubmit() {
    this.dialogRef.close(this.itemForm.getRawValue());
    // console.log(this.itemForm.value);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
