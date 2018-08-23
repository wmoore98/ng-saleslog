import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  title: string;
  msg: string;
}

@Component({
  selector: 'app-sales-log-delete-dialog',
  templateUrl: './sales-log-delete-dialog.component.html',
  styleUrls: ['./sales-log-delete-dialog.component.css']
})
export class SalesLogDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SalesLogDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
