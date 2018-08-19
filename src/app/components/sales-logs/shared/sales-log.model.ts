import { SalesLogEntry } from './sales-log-entry.model';

export class SalesLog {
  public id: string;  // In the form of YYYY-MM, e.g., 2018-08
  public username: string;
  public entries: SalesLogEntry[];

  constructor(
    id: string,
    username: string,
    entries: SalesLogEntry[]) {
    this.id = id;
    this.username = username;
    this.entries = entries;
  }
}
