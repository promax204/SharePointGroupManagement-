import {SharepointListItem} from '../NgTaxServices/sharepoint-list-item';
declare var $:any;


export class VehicleRegistrationListItem extends SharepointListItem{


constructor(rawResponse?:any){
		super(rawResponse);
		if(rawResponse){				
			///specific transformation for specific fields:
			super.toInteger("Vehicle1Year");
			super.toInteger("Vehicle2Year");
			super.toInteger("Vehicle3Year");			
			super.toBoolean("HasHandicapPermit");			
		}
	}
	
	getItemProperties():string[]{	
		return ["ID", "EmployeeNumber" ,"EmployeePhone", "EmployeeEmail" ,"Vehicle1Year" , "Vehicle1Make" ,
	"Vehicle1Model", "Vehicle1Color","Vehicle2Year" , "Vehicle2Make" ,"Vehicle1LicensePlate",
	"Vehicle2Model", "Vehicle2Color" ,"Vehicle2LicensePlate","Vehicle3Year" , "Vehicle3Make" ,
	"Vehicle3Model", "Vehicle3Color","Vehicle3LicensePlate", "HasHandicapPermit", "HandicapPermitRegistration" ,"HandicapPlacardNumber", "EmployeePerson"]
	}
	///user profile service always run on root web .
	getSiteUrl():string{
		return '/forms/VehicleRegistration/';
	}
	getListName():string{
		return 'VehicleRegistration2';
	}
	getFieldToUpdate():string{
		return 'Not implemented';
	}
	

}

