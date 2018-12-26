export class CommercialActivity {

  idOrder: number;

  commercialCategoryCol1: string;
  currencyCol1: string;
  initialPrice1: number;
  discount1: number;
  amountCol1: number;

  commercialCategoryCol2: string;
  currencyCol2: string;
  initialPrice2: number;
  discount2: number;
  amountCol2: number;

  commercialCategoryCol3: string;
  currencyCol3: string;
  initialPrice3: number;
  discount3: number;
  amountCol3: number;

  constructor(idOrder: number) {
    this.idOrder = idOrder;
  }
}
