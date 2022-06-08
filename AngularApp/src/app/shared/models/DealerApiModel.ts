import { FabricatorApiModel } from "./FabricatorApiModel";
export class DealerApiModel {
    DealerId: number = 0;
    Name: string = '';
    DealerGuid: string = '';
    PrimaryContactName: string = '';
    PrimaryContactEmail: string = '';
    PrimaryContactPhone: string = '';
    CreditLine: string = '';
    DefaultSalesTax: string = '';
    AWSFabricatorId: number = 0;
    ADSFabricatorId: number = 0;
    ASSFabricatorId: number = 0;
    ASSFabricator: FabricatorApiModel;
    ADSFabricator: FabricatorApiModel;
    AWSFabricator: FabricatorApiModel;
    Line1: string = '';
    Line2: string = '';
    City: string = '';
    PostalCode: string = '';
    State: string = '';
    latitude: number;
    longitude: number;

}
