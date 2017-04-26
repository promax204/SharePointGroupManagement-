import {Component} from '@angular/core';
import { OnInit } from '@angular/core';

import {MOCKGROUPS} from './mock-tax-sp-groups';
import {TaxSpGroup} from './tax-sp-group';
import {SharepointListItem} from './sharepoint-list-item';
import {SharepointListsWebService} from './sharepoint-lists-web.service';


@Component({
	moduleId: module.id,
    selector: 'web-part-2',
    template:`
	<h1>{{text}}</h1>
			<div>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					<tr *ngFor="let group of groups; let odd=odd; let even=even;" (click)="onSelect(group)" >
						<td>{{group.itemId}} </td>
						<td>{{group.title}} </td>
					</tr>
				</tbody>
			</table>
			</div>
			<div *ngIf="selectedGroup">
				<h2>Edit Request Type:{{selectedGroup.itemId}} - {{selectedGroup.title}}</h2>				
				<textarea #editedValue rows="4" value="{{selectedGroup.title}}" ></textarea>
				<input type="button" (click)="save(editedValue.value)" value="save">
				Item description:
				<pre>
				{{selectedGroup.title}}
				</pre>
			</div>
	`,
	providers: [SharepointListsWebService]
})
export class WebPart2Component implements OnInit {

	constructor(private sharepointListsWebService: SharepointListsWebService){}
    text: string = 'ISD Portal Group Management';
	groups: SharepointListItem[];
	selectedGroup:SharepointListItem = {
		itemId:333,
		title:'Sample Description'
	};
	
	 ngOnInit(): void {
	 this.sharepointListsWebService.getListItems('a','b').then
	 (result => this.groups = result);
	 
	}
	
	save(payload:string){
		this.sharepointListsWebService.updateListItem(this.selectedGroup.itemId,'title',payload).then(()=>{this.selectedGroup.title = payload;this.selectedGroup = null;});
	}
	
	onSelect(group:SharepointListItem):void{
		this.selectedGroup = group;
	}
}