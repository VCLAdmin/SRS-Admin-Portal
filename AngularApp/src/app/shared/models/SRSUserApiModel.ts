import { DealerApiModel } from "./DealerApiModel";
import { FabricatorApiModel } from "./FabricatorApiModel";

export class SRSUserApiModel {
    UserId: number = 0;
    UserGuid: string = '';
    NameFirst: string = '';
    NameLast: string = '';
    Email: string = '';

    FabricatorId: number = 0;
    AWSFabricatorId: number = 0;
    ADSFabricatorId: number = 0;
    ASSFabricatorId: number = 0;
    DealerId: number = 0;

    Fabricator: FabricatorApiModel;
    AWSFabricator: FabricatorApiModel;
    ADSFabricator: FabricatorApiModel;
    ASSFabricator: FabricatorApiModel;
    Dealer: DealerApiModel;
    UserRole: string = '';

    FabricatorName: string = '';
    DealerName: string = '';
    Password: string = '';

}