import { SalesLogEntry } from './sales-log-entry.model';

export class SalesLog {
  public id: string;
  // public description: string;
  public username: string;
  public entries: SalesLogEntry[];

  constructor(
    id: string,
    // description: string,
    username: string,
    entries: SalesLogEntry[]) {
    this.id = id;
    // this.description = description;
    this.username = username;
    this.entries = entries;
  }
}
