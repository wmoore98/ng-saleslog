export class SalesLogEntry {
    public stockNumber: string;
    public unitType: string;
    public split: boolean;
    public soldDate: Date;
    public frontGrossAmount: number;
    public backGrossAmount: number;
    public totalGrossAmount: number;
    public customerName: string;
    public deskManager: string;
    public financeManager: string;
    public notes: string;

  // constructor(
  //   public stockNumber: string,
  //   public unitType: string,
  //   public split: boolean,
  //   public soldDate: Date,
  //   public frontGrossAmount: number,
  //   public backGrossAmount: number,
  //   public totalGrossAmount: number,
  //   public customerName: string,
  //   public deskManager: string,
  //   public financeManager: string,
  //   public notes: string
  // ) {}
}
