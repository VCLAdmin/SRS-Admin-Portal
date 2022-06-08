export class FabricatorApiModel {
    FabricatorId: number = 0;
    Name: string = '';
    FabricatorGuid: string = '';
    PrimaryContactName: string = '';
    PrimaryContactEmail: string = '';
    PrimaryContactPhone: string = '';

    Line1: string = '';
    Line2: string = '';
    City: string = '';
    PostalCode: string = '';
    State: string = '';
    Country: string = '';
    County: string = '';
    latitude: number;
    longitude: number;

    SupportsAWS: number;
    SupportsADS: number;
    SupportsASS: number;
}

export class Address {
    Line1: string = '';
    Line2: string = '';
    City: string = '';
    PostalCode: string = '';
    State: string = '';
    Country: string = '';
    County: string = '';
    Latitude: number = 0;
    Longitude: number = 0;
}