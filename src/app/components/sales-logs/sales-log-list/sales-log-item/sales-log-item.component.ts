import { Component, OnInit, Input } from '@angular/core';
import { SalesLog } from '../../shared/sales-log.model';

@Component({
  selector: 'app-sales-log-item',
  templateUrl: './sales-log-item.component.html',
  styleUrls: ['./sales-log-item.component.css']
})
export class SalesLogItemComponent implements OnInit {

  @Input() salesLog: SalesLog;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
