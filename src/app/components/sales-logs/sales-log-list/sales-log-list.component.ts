import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SalesLog } from '../shared/sales-log.model';
import { SalesLogService } from '../shared/sales-log.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sales-log-list',
  templateUrl: './sales-log-list.component.html',
  styleUrls: ['./sales-log-list.component.css']
})
export class SalesLogListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  salesLogs: SalesLog[] = [];

  constructor(private salesLogService: SalesLogService,
    private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.salesLogService.salesLogsChanged
      .subscribe(
        (salesLogs: SalesLog[]) => {
          this.salesLogs = salesLogs;
        }
      );
    // this.salesLogs = this.salesLogService.getSalesLogs();
    this.salesLogService.getSalesLogs();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
