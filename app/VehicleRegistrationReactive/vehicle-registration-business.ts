import {SharepointListsWebService} from '../NgTaxServices/sharepoint-lists-web.service';
import {VehicleRegistrationListItem} from './vehicle-registration-list-entry';



export class VehicleRegistrationBusiness{

	constructor(private sharepointListsWebService: SharepointListsWebService){}

	addOrUpdateListItem(keyValuePairs: [string, string][]):Promise<number>{
		return this.sharepointListsWebService.addOrUpdateListItem(new VehicleRegistrationListItem() , keyValuePairs);
	}
	
	loadItem(id:string):Promise<VehicleRegistrationListItem[]>{
		return this.sharepointListsWebService.getListItems(VehicleRegistrationListItem,["ID", id], null, null);
	}
	
}
