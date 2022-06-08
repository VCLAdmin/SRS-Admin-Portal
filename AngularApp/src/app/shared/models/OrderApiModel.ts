// export class OrderApiModel {
//     OrderId: number = 0;
//     OrderExternalId: string = '';
//     Status: string = '';
//     Process: string = '';
//     ModifiedByName: string = '';
//     ModifiedOn: Date = new Date();
//     Notes: string = '';

import { Address } from "./FabricatorApiModel";

//     DesignURL: string = '';
//     JsonURL: string = '';
//     ProposalURL: string = '';

// }


export class OrderApiModel {
    OrderId: number;
    OrderExternalId: string;
    ProjectId: number;
    DealerId: number;
    DealerName: string;
    FabricatorId: number;
    FabricatorName: string;
    ParentOrderId: number;
    Notes: string;

    ShippingAddressId: number;
    ShippingCost: number;
    Tax: number;
    Total: number;
    Discount: number;
    DiscountPercentage: number;
    ShippingMethod: boolean;

    CreatedByName: string;
    CreatedOn: Date;
    ModifiedByName: string;
    ModifiedOn: Date;

    Line1: string;
    Line2: string;
    State: string;
    City: string;
    PostalCode: string;

    Current_Status: string = '';
    Current_Process: string = '';
    OrderDetails: OrderDetailsApiModel[];
    AddressType: string = '';
    FromAddress: Address;
    ToAddress: Address;
    DisableDelete: boolean = true;
}

export class OrderDetailsApiModel {
    OrderDetailId: number;
    OrderDetailExternalId: number;
    OrderId: number;
    ProductId: number;
    DesignURL: string;
    JsonURL: string;
    ProposalURL: string;
    BomURL: string;
    OrderDetailscol: string;
    UnitPrice: string;
    Qty: number;
    SubTotal: number;
    AdditionalDetails: string;
    OrderStatus: OrderStatusApiModel[];

    ImagePath: string;
}

export class OrderStatusApiModel {
    OrderId: number;
    StatusId: number;
    StatusCode: string;
    StatusDescription: string;
    StatusModifiedOn: Date;
    StatusModifiedBy: number;
}