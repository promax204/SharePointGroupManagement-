import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';

import {SharepointListItem} from './sharepoint-list-item';
import {MOCKSHAREPOINTLISTITEMS} from './mock-sharepoint-list-items';

@Injectable()
export class SharepointListsWebService{
	private listsCollectionUrl = '/_vti_bin/Lists.asmx';

	getListItems(listName:string, camlFilter:string):Promise<SharepointListItem[]>{
		let listItemsUntouched = MOCKSHAREPOINTLISTITEMS;
		return Promise.resolve(listItemsUntouched);
	}
	updateListItem(itemId:number,field:string,payload:string):Promise<SharepointListItem>{
		return Promise.resolve( <SharepointListItem>{
		itemId:333,
		title:'Sample Description'
	});
	}
}