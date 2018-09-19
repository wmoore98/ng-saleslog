import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Decimal } from 'decimal.js';

import { SalesLog } from '../shared/sales-log.model';
import { SalesLogService } from '../shared/sales-log.service';

import { AuthService } from '../../auth/auth.service';
import { SalesLogDeleteDialogComponent } from './sales-log-delete-dialog/sales-log-delete-dialog.component';
import { IdToDescriptionPipe } from '../shared/idToDescription.pipe';
import { SalesLogEntry } from '../shared/sales-log-entry.model';
import { SalesLogItemEditDialogComponent } from './sales-log-item-edit-dialog/sales-log-item-edit-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-log-detail',
  templateUrl: './sales-log-detail.component.html',
  styleUrls: ['./sales-log-detail.component.css']
})
export class SalesLogDetailComponent implements OnInit, OnDestroy {

  salesLog: SalesLog;
  id: number;

  subscription: Subscription;

  displayedColumns1: string[] = [
    'index',
    'stockNumber',
    'unitType',
    'split',
    'soldDate',
    'frontGrossAmount',
    'backGrossAmount',
    'totalGrossAmount'
  ];
  displayedColumns2: string[] = [
    'index',
    'stockNumber',
    'customerName',
    'deskManager',
    'financeManager',
    'notes'
  ];
  // displayedColumns: string[] = [
  //   'index',
  //   'stockNumber',
  //   'unitType',
  //   'split',
  //   'soldDate',
  //   'frontGrossAmount',
  //   'backGrossAmount',
  //   'totalGrossAmount',
  //   'customerName',
  //   'deskManager',
  //   'financeManager',
  //   'notes'
  // ];
  dataSource = [];


  constructor(private salesLogService: SalesLogService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private pipe: IdToDescriptionPipe) { }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.salesLog = this.salesLogService.getSalesLog(this.id);
          this.dataSource = this.salesLog.entries;
        }
      );
  }


  onDelete(): void {
    const logDescription = this.pipe.transform(this.salesLog.id);
    const title = 'Delete Sales Log?';
    const msg = `Are you sure you want to delete the sales log for ${logDescription}?`;
    const dialogRef = this.dialog.open(SalesLogDeleteDialogComponent, {
      width: '250px',
      data: {title: title, msg: msg}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salesLogService.deleteSalesLog(this.id);
        this.router.navigate(['/sales-logs']);
      }
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getTotalGross(frontGross, backGross) {
    const totalGross = Decimal.add(frontGross || 0, backGross || 0);
    return +totalGross;
  }

  getTotalUnits() {
    return this.dataSource
      .map((t: SalesLogEntry) => t.split ? .5 : 1)
      .reduce((acc, value) => acc + value, 0);
  }
  getSumFrontGross() {
    return this.dataSource
      .map((t: SalesLogEntry) => t.frontGrossAmount || 0)
      .reduce((acc, value) => acc + value, 0);
  }

  getSumBackGross() {
    return this.dataSource
      .map((t: SalesLogEntry) => t.backGrossAmount || 0)
      .reduce((acc, value) => acc + value, 0);
  }

  getSumTotalGross() {
    return this.dataSource
      .map((t: SalesLogEntry) => this.getTotalGross(t.frontGrossAmount, t.backGrossAmount))
      .reduce((acc, value) => acc + value, 0);
  }

  formatDate(inDate) {
    const myDate = new Date(inDate);
    const options = {year: '2-digit', month: '2-digit', day: '2-digit' };
    return myDate.toLocaleDateString('en-US', options);
  }

  editItem(index: number) {

    const dialogRef = this.dialog.open(SalesLogItemEditDialogComponent, {
      width: '150dp',
      data: {salesLogEntry: this.dataSource[index]}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource[index] = result;
        // console.log('after', result);
        // console.log('after data', this.dataSource[index]);
        this.salesLogService.updateSalesLog(this.id, this.salesLog);
        // this.router.navigate(['/sales-logs']);
        // this.router.navigate(['/sales-logs/' + this.id]);
        // this.router.navigate(['.'], {relativeTo: this.route});
        // this.salesLogService.deleteSalesLog(this.id);
        // this.router.navigate(['/sales-logs']);
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
