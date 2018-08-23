import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Decimal } from 'decimal.js';

import { SalesLog } from '../shared/sales-log.model';
import { SalesLogService } from '../shared/sales-log.service';

import { AuthService } from '../../auth/auth.service';
import { SalesLogDeleteDialogComponent } from './sales-log-delete-dialog/sales-log-delete-dialog.component';
import { IdToDescriptionPipe } from '../shared/idToDescription.pipe';

// export interface DialogData {
//   title: string;
//   msg: string;
// }

@Component({
  selector: 'app-sales-log-detail',
  templateUrl: './sales-log-detail.component.html',
  styleUrls: ['./sales-log-detail.component.css']
})
export class SalesLogDetailComponent implements OnInit {

  salesLog: SalesLog;
  id: number;

  // title: string;
  // msg: string;


  displayedColumns: string[] = [
    'index',
    'stockNumber',
    'unitType',
    'split',
    'soldDate',
    'frontGrossAmount',
    'backGrossAmount',
    'totalGrossAmount'
  ];
  dataSource = [];


  constructor(private salesLogService: SalesLogService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private pipe: IdToDescriptionPipe) { }

  ngOnInit() {
    this.route.params
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
    const totalGross = Decimal.add(frontGross, backGross);
    return +totalGross;
  }

  formatDate(inDate) {
    const myDate = new Date(inDate);
    const options = {year: '2-digit', month: '2-digit', day: '2-digit' };
    return myDate.toLocaleDateString('en-US', options);
  }

}
