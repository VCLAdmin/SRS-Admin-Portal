export class FinancialApiModel {
    FinancialId: number = 0;
    FinancialExternalId: string = '';

    DealerId: number = 0;
    DealerName: string = '';

    LineOfCredit: number = 0;
    OrdersToDate: number = 0;
    PaidToDate: number = 0;
    CurrentBalance: number = 0;
    OpeningBalance: number = 0;
    
    CreatedByName: string = '';
    CreatedBy: number = 0;
    CreatedOn: Date;
    ModifiedByName: string = '';
    ModifiedBy: number = 0;
    ModifiedOn: Date;
}
