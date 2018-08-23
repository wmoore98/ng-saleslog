import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SalesLog } from './sales-log.model';
import { SalesLogEntry } from './sales-log-entry.model';
import { DataStorageService } from './data-storage.service';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SalesLogService {

  salesLogsChanged = new Subject<SalesLog[]>();
  salesLogItemEdited = new Subject<SalesLogEntry>();

  private salesLogs: SalesLog[] = [];

  constructor(private dataStorageService: DataStorageService) { }

  setSalesLogs(salesLogs: SalesLog[]) {
    this.salesLogs = salesLogs;
    this.salesLogsChanged.next(this.salesLogs.slice());
  }

  getSalesLogs() {
    this.dataStorageService.getSalesLogs()
      .subscribe(
      (salesLogs: SalesLog[]) => {
        this.salesLogs = salesLogs;
        this.salesLogsChanged.next(this.salesLogs.slice());
      });

    // return a clone of the recipes array and not a reference to the original
    // PROBLEM WITH REFERENCES WITHIN ARRAY
    // return this.salesLogs.slice();
  }

  getSalesLog(idx: number): SalesLog {
    return this.salesLogs.slice()[idx];
  }
  // getSalesLog(id: string): SalesLog {
  //   return this.salesLogs.find(salesLog => salesLog.id === id);
  // }

  addSalesLog(salesLog: SalesLog) {
    this.salesLogs.push(salesLog);
    this.salesLogsChanged.next(this.salesLogs.slice());
    this.dataStorageService.storeSalesLog(salesLog)
      .subscribe(
        (response: Response) => console.log(response.json()),
        (error) => console.log(error)
      );
  }

  updateSalesLog(index: number, salesLog: SalesLog) {
    this.salesLogs[index] = salesLog;
    this.salesLogsChanged.next(this.salesLogs.slice());
    this.dataStorageService.storeSalesLog(salesLog)
      .subscribe(
        (response: Response) => console.log(response.json()),
        (error) => console.log(error)
      );

  }

  deleteSalesLog(index: number) {
    const salesLog = this.salesLogs.splice(index, 1)[0];
    this.salesLogsChanged.next(this.salesLogs.slice());
    this.dataStorageService.destroySalesLog(salesLog)
      .subscribe(
        (response: Response) => console.log(response),
        (error) => console.log(error)
      );
  }

}
