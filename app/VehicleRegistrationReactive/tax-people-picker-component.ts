
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

 import { ViewChild } from '@angular/core';
 import { MdAutocompleteTrigger } from '@angular/material';

import {SharepointListsWebService} from '../NgTaxServices/sharepoint-lists-web.service';
import { UserInfoListEntry } from  '../NgTaxServices/user-info-list-entry';
import {TaxPeoplePickerBusiness} from './tax-people-picker-business';





// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'people-picker',
 	template: `
	<div class="taxPeoplePickerContainer">
		<div *ngIf="selectedEmp" [mdTooltip] = "selectedEmp.email+' - '+selectedEmp.name">
			{{selectedEmp.title}}
		</div>
		Flag: {{flag}}Enter :{{userHitEnter}}
		<input type="text" mdInput [class.taxResolvedPicker]="isResolved" [mdAutocomplete]="auto" #term [mdTooltip]="pickerTooltip" (keydown)="detectKeyDown($event);"  (keyup.enter)="userHitEnter= true;search(term.value ,$event);" (keyup)="search(term.value, $event);" class="taxPeoplePickerText form-control" id="empemail" name="empemail" placeholder="Start typing employee name" [(ngModel)]="empTitle">
		<md-progress-bar mode="indeterminate"  *ngIf="numberOfActiveRequests>0" ></md-progress-bar>
		<div *ngIf="currentItems.length==0&& (!isResolved)&& empTitle?.length>1&& numberOfActiveRequests ==0&&(!hideNoResultsFound)" class="alert alert-danger">
			No results found for '{{empTitle}}'
		</div>
		<md-autocomplete #auto="mdAutocomplete">
			<md-option *ngFor="let item of items | async" [value]="item.title" (onSelectionChange)="setEmployee(item, $event)" [mdTooltip]="item.email+' - '+item.name">
				<div class="taxMainResultPicker">{{item.title}}</div>
				<div class="taxSecResultPicker">{{item.jobTitle}}</div>
			</md-option>
		</md-autocomplete>
	</div>
	`,
    styles:[`
	
	.taxResolvedPicker{	
		text-decoration:underline;
	}
	
	.mat-option{
		line-height:inherit;
		border-bottom-color:#DDD;
		border-bottom-style:solid;
		border-bottom-width:1px;
	}
	
	.taxPeoplePickerContainer{
		display:inline-block
		width:100%;
	}
	
	.taxPeoplePickerResults{
		width:100%;
	}
	
	.taxPeoplePickerText{
			line-height:normal;
			padding-top:0px;
			padding-bottom:0px;
			height:25px;
	}
	.taxMainResultPicker{
		font-size:14px;
		font-family: "Segoe UI Regular WestEuropean","Segoe UI",Tahoma,Arial,sans-serif;
		font-weight:400;
		color:#333;
		padding-top:4px;
	}
	.taxSecResultPicker{
		font-size:12px;
		color:#666;
		font-family: "Segoe UI Regular WestEuropean","Segoe UI",Tahoma,Arial,sans-serif;
		font-weight:400;
		margin-top:2px;	
	}
	`]
})
export class TaxPeoplePickerComponent {

	//access to the input that triggers the autocomplete.
	@ViewChild('term', { read: MdAutocompleteTrigger }) 
	autoCompleteInput: MdAutocompleteTrigger;
	
	taxPeoplePickerBusiness:TaxPeoplePickerBusiness;
	items: Observable<UserInfoListEntry[]>;
	currentItems : UserInfoListEntry[] = [];
	private searchTermStream = new Subject<string>();
	
	/*Main property bound to textbox*/
	empTitle: string = null;
	selectedEmp: UserInfoListEntry = null;
	numberOfActiveRequests:number=0;
	userHitEnter:boolean = false;
	flag=false;
	isResolved = false;
	pickerTooltip = "Please start typing a name";
	hideNoResultsFound = true;

	private cleanPicker(){
		this.pickerTooltip = "Please start typing a name";
		this.isResolved = false;
		this.userHitEnter = false;
		this.currentItems = [];
		this.numberOfActiveRequests = 0;
		this.selectedEmp = null;
	}

	private resolvePicker(employee: UserInfoListEntry){
		this.pickerTooltip = employee['email'] +' - ' +employee['name'];
		this.isResolved =  true;
		this.selectedEmp = employee;
	}

	private toTitleCase(term: string) {
		return term.replace(/\w\S*/g, (term) => { return term.charAt(0).toUpperCase() + term.substr(1).toLowerCase(); });
	}
	

	detectKeyDown(event:KeyboardEvent){
	//if(this.isResolved&& this.selectedEmp && this.empTitle == this.selectedEmp.title){
		//if(event && event.keyCode ==8&& this.selectedEmp && this.empTitle == this.selectedEmp.title){
		//if(event && event.keyCode ==8&& this.isResolved){
		
		let safeKeys :number[]= [9,13,35,36,37,38,39,40] ;
		if(event && this.isResolved && safeKeys.filter(x=> x==event.keyCode).length==0){
			//so that i can put here an if isresolved then cleanup the picker.
			this.cleanPicker();
			this.empTitle = '';
			this.flag = true;	// question this line of code? ? ?? ??
		}
	}
	///Sets employee via the autocomplete.
	/// Either by hitting enter (keyboard) or by clicking on an option.
	setEmployee(emp: UserInfoListEntry, event:any) {
		//this.selectedEmp = emp;
		this.empTitle= '';
		this.search("", null);
		this.resolvePicker(emp);
		//this.isResolved = true;
	}

	search(term: string, event:KeyboardEvent) {	
		if(event && event.keyCode > 34 && event.keyCode<41){
			//disregard arrow keys: 37, 38, 39, 40.
			//disregard end and home: 35, 36.
			return ; 
		}
	
		if(this.flag){
			//prevent coming twice to the same method.
			this.flag = false;
			return;
		}
		if(this.userHitEnter && this.currentItems){
			let filteredResults:UserInfoListEntry[];
			filteredResults = this.currentItems.filter(y => y.title.toUpperCase ==this.empTitle.toUpperCase);
			if(filteredResults && filteredResults.length ==1){
				//this.resolvePicker(filteredResults[0]);
				this.userHitEnter = false;
				this.flag = true;
				this.empTitle = filteredResults[0].title;
				this.resolvePicker(filteredResults[0]);
				this.autoCompleteInput.closePanel();
				this.searchTermStream.next("");			
				return;
			}
		}
		this.hideNoResultsFound = true;//it was on the on key down at the beginning.
		this.searchTermStream.next(this.toTitleCase(term));
	}

	constructor(private sharepointListsWebService: SharepointListsWebService) {
		this.taxPeoplePickerBusiness = new TaxPeoplePickerBusiness(sharepointListsWebService);
		this.items = <Observable<UserInfoListEntry[]>>this.searchTermStream
		  .debounceTime(300)
		  .distinctUntilChanged()
		  .switchMap((term: string) => {
			this.numberOfActiveRequests+=1;
			return this.taxPeoplePickerBusiness.searchForPeople(term).then(x=>{
				if(x){
					if(this.hideNoResultsFound&& term.length > 1){
						this.hideNoResultsFound = false;
					}
					let tempResults:UserInfoListEntry[]=<UserInfoListEntry[]> x;
					let filteredResults:UserInfoListEntry[];
					this.currentItems = tempResults;
					if(this.userHitEnter){
						filteredResults = tempResults.filter(y => y.title.toUpperCase ==this.empTitle.toUpperCase);
						this.userHitEnter = false;
						if(filteredResults && filteredResults.length ==1){
							//this.resolvePicker(filteredResults[0]);
							this.autoCompleteInput.closePanel();
							this.empTitle = filteredResults[0].title;
							this.resolvePicker(filteredResults[0]);
							tempResults = [];
						}
					}
					this.numberOfActiveRequests-=1;
					return tempResults;
				}
				this.numberOfActiveRequests-=1;
				return x;
				});
		  });
	}

	
}