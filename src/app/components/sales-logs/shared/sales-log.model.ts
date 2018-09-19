import { SalesLogEntry } from './sales-log-entry.model';

export class SalesLog {
  constructor (
    public id: string = '',  // In the form of YYYY-MM, e.g., 2018-08
    public email: string = '',
    public entries: SalesLogEntry[] = []
  ) {}

}
