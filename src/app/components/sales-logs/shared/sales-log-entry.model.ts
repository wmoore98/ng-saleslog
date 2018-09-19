export class SalesLogEntry {
  constructor(
    public stockNumber: string = '',
    public unitType: string = '',
    public split: boolean = false,
    public soldDate: Date = new Date(),
    public frontGrossAmount: number = 0,
    public backGrossAmount: number = 0,
    public totalGrossAmount: number = 0,
    public customerName: string = '',
    public deskManager: string = '',
    public financeManager: string = '',
    public notes: string = ''
  ) {}
}
