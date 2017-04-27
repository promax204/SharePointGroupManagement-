import {Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {SharepointListsWebService} from './sharepoint-lists-web.service';
import {SharepointUserGroupWebService} from './sharepoint-usergroup-web.service';
import {MOCKGROUPS} from './mock-tax-sp-groups';
import {TaxSpGroup} from './tax-sp-group';
import {GroupEntry} from './group-entry';



@Component({
	moduleId: module.id,
    selector: 'web-part-2',
	styles:[`.taxActive {background-color: #D9EDF7 !important;}
			.taxTableRow {cursor:pointer;}
			
	`],
	
    template:`
	<div class="container">
			<h1>ISD Portal email & security Group Management</h1>
			<div *ngIf="!selectedGroup">
				<div class="form-horizontal" >
					<div class="form-group" tooltip="You can enter one email or multiple emails separated by semi-colon ';'">
						<label class="control-label col-sm-2"><strong>Search People:</strong></label>
						<div class="col-sm-10">
							<input [(ngModel)]="searchTerm" class="form-control" type="text" (keyup)="search();"   placeholder="type to search...">
						</div>
					</div>	
				</div>
				<table style="table-layout:fixed;" class="table table-striped table-hover table-condensed">
					<thead>
						<tr>						
							<th style="width:10%;">Group Name</th>
							<th style="width:30%;">Descriptionn</th>
							<th style="width:5%;">Members</th>
							<th style="width:55%;">Emails</th>
						</tr>
					</thead>
					<tbody>
						<tr [class.taxTableRow]="true" *ngFor="let group of groups;" (click)="onSelect(group)" [class.info]="group===selectedGroup">
							<td style="word-wrap:break-word;">{{group.title}} </td>
							<td style="word-wrap:break-word;">{{group.description}} </td>
							<td style="word-wrap:break-word;">{{group.arrayOfEmails.length}} </td>
							<td style="word-wrap:break-word;">{{group.emails}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div *ngIf="selectedGroup">
				<input type="button" style="margin-bottom:10px;" class="btn btn-primary" (click)="selectedGroup=null;"  value="Go Back" />
				<div class="well">
					<h2>Add / Remove People for: {{selectedGroup.title}}</h2>	
					<strong>Group description:</strong>
					{{selectedGroup.description}}
					<div *ngIf="successMessage" class="alert alert-success">
						<strong>Success!!!</strong> {{successMessage}}
					</div>
					<div>
						<div class="form-group" tooltip="You can enter one email or multiple emails separated by semi-colon ';'">
							<label>Enter email(s) to add to this security / mailing group:</label>
							<input [(ngModel)]="emailsToAdd"  class="form-control" type="text"  (keyup.enter)="add();" placeholder="You can enter one email or multiple emails separated by semi-colon ';'"  tooltip="You can enter one email or multiple emails separated by semi-colon ';'">
							<div *ngIf="errorAdding" class="alert alert-danger" >
								{{errorAdding}}
							</div>
						</div>	
							
							<input type="button" class="btn btn-primary" (click)="add();"  value="Add Email(s)" />
						<div style="margin-top:10px;">
							<input style="margin-bottom:10px;" type="button" class="btn btn-primary" (click)="removeSelected();" value="Remove Selected" [disabled]="(!(emailsToErase&&(emailsToErase.length>0)))|| (selectedGroup.arrayOfEmails.length==emailsToErase.length)" />
							Total count of emails: {{selectedGroup.arrayOfEmails.length}}
							<div style="word-wrap:break-word;" class="alert alert-info" *ngIf="emailsToErase&&emailsToErase.length>0&& emailsToErase.length!=selectedGroup.arrayOfEmails.length">
								<p><strong>You are getting ready to erase {{emailsToErase.length}} emails:</strong></p>
								<span *ngFor="let a of emailsToErase">{{a}},</span>
								<p><strong>Click on 'Remove Selected' to confirm permanent deletion.</strong></p>
							</div>
							<div style="word-wrap:break-word;" class="alert alert-info" *ngIf="emailsToErase&&emailsToErase.length>0&& emailsToErase.length==selectedGroup.arrayOfEmails.length">
								<p><strong>You can't erase all emails, at least one contact email must remain in this group.</strong></p>
							</div>
							<div *ngIf="errorRemoving" class="alert alert-danger">
								{{errorRemoving}}
							</div>
							<div class="list-group" style="max-height:300px;overflow-y:auto">
								<a href="#" [class.taxActive]="emailsToErase.indexOf(emailEntry)>=0" class="list-group-item" (click)="onChange2(emailEntry)"  *ngFor="let emailEntry of selectedGroup.arrayOfEmails" >
									<input style="margin-right:35px;"  type="checkbox" value="{{emailEntry}}" [checked]="emailsToErase.indexOf(emailEntry)>=0" />{{emailEntry}}
								</a>
							</div>
							<div *ngIf="errorRemoving" class="alert alert-danger">
								{{errorRemoving}}
							</div>
							<input style="margin-top:10px;" type="button" class="btn btn-primary" (click)="removeSelected();" value="Remove Selected" [disabled]="(!(emailsToErase&&(emailsToErase.length>0)))|| (selectedGroup.arrayOfEmails.length==emailsToErase.length)" />
							Total count of emails: {{selectedGroup.arrayOfEmails.length}}
						</div>
						
					</div>
					<div  *ngIf="successMessage" class="alert alert-success">
						<strong>Success!!!</strong> {{successMessage}}
					</div>
				</div>
				<input type="button" class="btn btn-primary" (click)="selectedGroup=null;"  value="Go Back" />
				<input type="text" value="jorge.gutierrez@taxx.state.oh.us" #testValue />
				<input type="button" class="btn btn-primary" (click)="testEmail(testValue.value);"  value="TestAPI" />
				{{debugValue|json}}
				{{selectedGroup.spGroupName}}
			</div>
	</div>		
	`,
	providers: [SharepointListsWebService,SharepointUserGroupWebService]
})
export class WebPart2Component implements OnInit {

	constructor(private sharepointListsWebService: SharepointListsWebService, private sharepointUserGroupWebService: SharepointUserGroupWebService){}
	
	groups: GroupEntry[];
	selectedGroup:GroupEntry ;
	emailsToErase:string[]= [];
	emailsToAdd:string;
	errorAdding:string;
	errorRemoving:string;
	successMessage:string;
	originalGroups:GroupEntry[]=null;
	searchTerm:string;
	debugValue:any;
	
	
	 ngOnInit(): void {
	 this.sharepointListsWebService.getListItems(GroupEntry).then
	 (result => this.groups = <GroupEntry[]>result);
	}
	
	
	add(){
		var reg:RegExp = /^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*;\s*|\s*$))+$/g
		this.errorAdding = '';
		this.successMessage="";
		let finalArray:string[]=[];
		let filteredArray:string[]=[];
		let duplicatedArray:string[]=[];
		if(this.emailsToAdd){
			this.emailsToAdd = this.emailsToAdd.trim();
			if(this.emailsToAdd.length>0){
				if(reg.test(this.emailsToAdd)){
					finalArray = GroupEntry.stringToArray(this.emailsToAdd);
					for(let x = 0;x<finalArray.length;x++){
						if(this.selectedGroup.arrayOfEmails.indexOf(finalArray[x])==-1){
							filteredArray.push(finalArray[x]);
						}
						else{
							duplicatedArray.push(finalArray[x]);
						}
					}
					if(filteredArray.length >0){
						finalArray=this.selectedGroup.arrayOfEmails.concat(filteredArray);
						finalArray.sort(GroupEntry.sortInsensitive);
						this.sharepointListsWebService.updateListItem(this.selectedGroup,finalArray.toString()).then(()=>{
							this.successMessage = finalArray.length - this.selectedGroup.arrayOfEmails.length + " emails were added!!!";
							if(duplicatedArray.length > 0){
								this.successMessage+="\n The following emails were not added because were already part of the group: "+duplicatedArray.toString();
							}
							this.selectedGroup.arrayOfEmails = finalArray;
							this.selectedGroup.emails = finalArray.toString();
							this.emailsToAdd = '';
							})
						.catch((error:any)=> this.errorAdding = "An error occurred while adding: "+(error.message || error));
					}
					else
					this.errorAdding='The specified email(s) already exist in this group';
				}
				else
				this.errorAdding='Invalid entry. Please enter an email or several emails delimited by a semi-colon.';
			}
			else
				this.errorAdding='Please enter an email or several emails delimited by a semi-colon';
		}
		else
		this.errorAdding='Please enter an email or several emails delimited by a semi-colon';		
	}
	
	removeSelected(){
		this.errorRemoving = '';
		this.successMessage ="";
		let finalArray:string[]= this.selectedGroup.arrayOfEmails.slice();
		for(let x = 0 ;x<this.emailsToErase.length;x++){
			finalArray.splice(finalArray.indexOf(this.emailsToErase[x]),1);
		}
		this.sharepointListsWebService.updateListItem(this.selectedGroup,finalArray.toString()).then(()=>{
		this.successMessage = "The following email(s) were successfully removed: "+this.emailsToErase.toString(); 
		this.selectedGroup.arrayOfEmails = finalArray;
		this.selectedGroup.emails = finalArray.toString();
		this.emailsToErase = [];
		})
	.catch((error:any)=> this.errorAdding = "An error occurred while adding: "+(error.message || error));
	}
	
	onChange2(emailEntry2:string){
		if(this.emailsToErase.indexOf(emailEntry2)>=0){
			this.emailsToErase.splice(this.emailsToErase.indexOf(emailEntry2), 1);
		}
		else{
			this.emailsToErase.push(emailEntry2);
		}		
		this.errorAdding = '';
		this.successMessage ='';
		this.errorRemoving = '';
	}
	
	search(){	
		if(this.searchTerm){
			if(this.originalGroups==null){
				this.originalGroups = this.groups;
			}
			this.groups = this.groups.filter(this.filterGroupEntry, this);
		}
		else if (this.originalGroups){
			this.groups = this.originalGroups;
			this.originalGroups = null;
		}
		
	}
	
	testEmail(emailValue:string){
		this.sharepointUserGroupWebService.getUserLoginFromEmail(emailValue,'https://sp2010-tax.sp.ohio.gov/Forms/ISDPortal/').then((y)=>{
			this.debugValue= y;
		})
		.catch((error:any)=> this.errorAdding = "An error occurred while adding: "+(error.message || error));
	}
	
	filterGroupEntry(entry:GroupEntry):boolean{
		return entry.emails.toLowerCase().indexOf(this.searchTerm.toLowerCase())>=0;
	}
	
	
	
	onSelect(group:GroupEntry):void{
		this.selectedGroup = group;
		this.emailsToErase = [];
		this.errorAdding = '';
		this.successMessage ='';
		this.errorRemoving = '';
	}
}