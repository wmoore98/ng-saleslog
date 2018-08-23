import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { SalesLog } from './sales-log.model';

const databaseURL = 'https://ng-sales-log.firebaseio.com';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
    private authService: AuthService) { }


  storeSalesLog(salesLog: SalesLog) {
    // MUST PROVIDE A CASE FOR HANDLING A CHANGE TO -ID-
    // ALSO APP NEEDS TO WATCH FOR DUPLICATE ID's
    const token = this.authService.getToken();
    const user = this.authService.getUser();
    const logId = salesLog.id;
    console.log('storeSalesLog', salesLog);
    return this.http.put(`${databaseURL}/salesLogs/${user}/${logId}.json?auth=${token}`, salesLog);
  }

  destroySalesLog(salesLog: SalesLog) {
    const token = this.authService.getToken();
    const user = this.authService.getUser();
    const logId = salesLog.id;
    console.log('destroySalesLog', salesLog);
    return this.http.delete(`${databaseURL}/salesLogs/${user}/${logId}.json?auth=${token}`);
  }

  getSalesLogs() {
    const token = this.authService.getToken();
    const user = this.authService.getUser();
    return this.http.get(`${databaseURL}/salesLogs/${user}.json?auth=${token}`)
      .pipe(map(
        (response: Response) => {
          console.log(response.json());
          const salesLogsObj: Object = response.json();

          // Convert returned object to array - works but might want to re-address
          const salesLogs = [];
          for (const key in salesLogsObj) {
            if (salesLogsObj.hasOwnProperty(key)) {
              const salesLog = salesLogsObj[key];
              salesLogs.push(salesLog);
            }
          }

          // Make sure each sales log has entries array, add empty array if necessary
          if (salesLogs) {
            salesLogs.forEach(salesLog => {
              if (!salesLog['entries']) {
                salesLog['entries'] = [];
              }
            });
          }

          return salesLogs;
        }
      ));

  }

}
