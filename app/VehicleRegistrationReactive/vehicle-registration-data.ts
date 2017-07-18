export class VehicleRegistrationData{

employee: TaxEmployee;
vehicles: TaxVehicle[] ;
hasHandicapPermit : boolean;
handicapPermitRegistration ?= '';
handicapPlacardNumber? = '';
}

export class TaxEmployee{

souid = '';
workPhone = '';
workEmail = '';
displayName = '';
loginAccount = '';
}


export class TaxVehicle{
year : number;
make = '';
model = '';
color = '';
licensePlateNumber = '';
}