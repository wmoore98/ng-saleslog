import { Component, OnInit } from '@angular/core';
import { SalesLog } from '../shared/sales-log.model';
import { SalesLogService } from '../shared/sales-log.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Decimal } from 'decimal.js';

@Component({
  selector: 'app-sales-log-detail',
  templateUrl: './sales-log-detail.component.html',
  styleUrls: ['./sales-log-detail.component.css']
})
export class SalesLogDetailComponent implements OnInit {

  salesLog: SalesLog;
  id: number;

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
    private authService: AuthService) { }

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

  onDelete() {
    // NEED TO ADD CONFIRMATION
    this.salesLogService.deleteSalesLog(this.id);
    this.router.navigate(['/sales-logs']);
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
