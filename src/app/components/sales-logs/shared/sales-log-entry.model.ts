export class SalesLogEntry {
  constructor(
    public stockNumber: string,
    public unitType: string,
    public split: boolean,
    public soldDate: Date,
    public grossAmount: number,
    public frontGrossAmount: number,
    public backGrossAmount: number
  ) {}
}
