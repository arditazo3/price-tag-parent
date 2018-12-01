export class CommercialActivity {
    idOrder: number;

    commercialCategoryCol1: string;
    currencyCol1: string;
    amountCol1: number;

    commercialCategoryCol2: string;
    currencyCol2: string;
    amountCol2: number;

    commercialCategoryCol3: string;
    currencyCol3: string;
    amountCol3: number;

    constructor(idOrder: number) {
        this.idOrder = idOrder;
    }
}