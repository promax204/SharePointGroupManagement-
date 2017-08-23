
import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormControl, FormGroup , Validators, ValidatorFn , AbstractControl} from '@angular/forms';
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
	<div class="taxPeoplePickerContainer" [formGroup]="group">
		<div *ngIf="selectedEmp" style="padding-left:12px;" [mdTooltip] = "selectedEmp.email+' - '+selectedEmp.name">
			{{selectedEmp.name}}
		</div>
		<input type="text" [class.taxResolvedPicker]="isResolved" [class.taxUnresolvedPicker]="entryNotValid" [mdAutocomplete]="auto" #term 
			[mdTooltip]="pickerTooltip" (keydown)="detectKeyDown($event);"  
			(keyup.enter)="userHitEnter= true;search(term.value ,$event);" (blur) = "blurEvent(term.value);" (keyup)="search(term.value, $event);" 
			class="taxPeoplePickerText form-control" [attr.id]="controlId" formControlName="displayName" 
			placeholder="Start typing employee name" >
		<md-progress-bar mode="indeterminate"  *ngIf="numberOfActiveRequests>0" ></md-progress-bar>
		<div *ngIf="currentItems.length==0&& (!isResolved)&& empTitle?.length>1&& numberOfActiveRequests ==0&&(!hideNoResultsFound)" class="alert alert-danger">
			No results found for '{{empTitle}}'
		</div>
		<md-autocomplete #auto="mdAutocomplete">
			<div *ngIf="!isResolved">
			<md-option  *ngFor="let item of items | async" [value]="item.title"
			(onSelectionChange)="setEmployee(item, $event)" [mdTooltip]="item.email+' - '+item.name">
				<div class="taxMainResultPicker">{{item.title}}</div>
				<div class="taxSecResultPicker">{{item.jobTitle}}</div>
			</md-option>
			</div>
		</md-autocomplete>
	</div>
	`,
    styles:[`
	
	.taxUnresolvedPicker{
		font-style:italic;
		color: #a94442;
	}
	
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
	
	input.ng-invalid  {
			border-left: 5px solid #a94442; /* red */
		}
	`]
})
export class TaxPeoplePickerComponent implements OnInit {

 @Input()
 controlId:string;

 @Input()
 group:FormGroup;
 
 @Input()
 requiredMessage:string;

	//access to the input that triggers the autocomplete.
	@ViewChild('term', { read: MdAutocompleteTrigger }) 
	autoCompleteInput: MdAutocompleteTrigger;
	
	taxPeoplePickerBusiness:TaxPeoplePickerBusiness;
	items: Observable<UserInfoListEntry[]>;
	currentItems : UserInfoListEntry[] = [];
	private searchTermStream = new Subject<string>();
	
	/*Main property bound to textbox*/
	//this is GONE
	//empTitle: string = null;
	get empTitle():string{
		if(this.group){
			return this.group.get('displayName').value;
		}
		return null;
	}
	set empTitle(valueToSet:string){
		this.group.get('displayName').patchValue(valueToSet);
	}
	get isResolved():boolean{
		if(this.group){
			return this.group.get('isResolved').value;
		}
		return false;
	}
	
	set isResolved(valueToSet:boolean){
		this.group.get('isResolved').patchValue(valueToSet);
	}
	
	entryNotValid:boolean= false;
	/* get entryNotValid():boolean{
		if(this.group){
			return this.group.get('entryNotValid').value;
		}
		return false;
	}
	set entryNotValid(valueToSet:boolean){
		this.group.get('entryNotValid').patchValue(valueToSet);
		if(valueToSet){
			this.group.get('entryNotValid').setErrors({"entryNotValid":true});
		}else{
						this.group.get('entryNotValid').setErrors(null);

		}
	} */
	
	selectedEmp: UserInfoListEntry = null;
	numberOfActiveRequests:number=0;
	userHitEnter:boolean = false;
	flag=false;
	pickerTooltip = "Please start typing a name";
	hideNoResultsFound = true;

	private cleanPicker(){
		this.pickerTooltip = "Please start typing a name";
		this.isResolved = false;
		this.userHitEnter = false;
		this.currentItems = [];
		this.numberOfActiveRequests = 0;
		this.selectedEmp = null;
		this.entryNotValid = false;
	}

	private resolvePicker(employee: UserInfoListEntry){
		this.pickerTooltip = employee['email'] +' - ' +employee['name'];
		this.isResolved =  true;
		this.selectedEmp = employee;
		this.entryNotValid = false;
		this.group.get('insideTextbox').patchValue(employee.ID, {emitEvent:false});
	}

	private toTitleCase(term: string) {
		return term.replace(/\w\S*/g, (term) => { return term.charAt(0).toUpperCase() + term.substr(1).toLowerCase(); });
	}
	

	detectKeyDown(event:KeyboardEvent){
	//if(this.isResolved&& this.selectedEmp && this.empTitle == this.selectedEmp.title){
		//if(event && event.keyCode ==8&& this.selectedEmp && this.empTitle == this.selectedEmp.title){
		//if(event && event.keyCode ==8&& this.isResolved){
		
		let safeKeys :number[]= [9,13,35,36,37,38,39,40] ;
		if(event && (this.isResolved || this.entryNotValid)&& safeKeys.filter(x=> x==event.keyCode).length==0){
			//so that i can put here an if isresolved then cleanup the picker.
			this.cleanPicker();
			this.empTitle = '';
			this.flag = true;	// question this line of code? ? ?? ??
			// cleaning the search results.
			this.search("", null);

		}
	}
	///Sets employee via the autocomplete.
	/// Either by hitting enter (keyboard) or by clicking on an option.
	setEmployee(emp: UserInfoListEntry, event:any) {
		//this.selectedEmp = emp;
		//commenting the below line for reactive form.
		//this.empTitle= '';
		this.search("", null);
		this.resolvePicker(emp);
		//this.isResolved = true;
	}
	
	blurEvent(term:string){
		if(!this.isResolved &&this.empTitle){
			this.userHitEnter= true;
			//we are tricking the distinctUntilChanged with the addition of a space.
			//need better code.
			this.search(term+" ",  null);
		}
	}

	search(term: string, event:KeyboardEvent) {	
		if(this.entryNotValid ||(event && event.keyCode > 34 && event.keyCode<41)){
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
			filteredResults = this.currentItems.filter(x =>{ 
			var y = <any> x;
			var z = this.empTitle.toUpperCase().trim();
			return y.title.toUpperCase() ==z || y.email.toUpperCase() == z
			|| y.name.toUpperCase() == z || y.name.toUpperCase() == ("ID\\"+z)
			});
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
						filteredResults = tempResults.filter(x => {
							var y = <any> x;
							var z = this.empTitle.toUpperCase().trim();
							return y.title.toUpperCase() ==z || y.email.toUpperCase() == z
							|| y.name.toUpperCase() == z || y.name.toUpperCase() == ("ID\\"+z)
						});
						this.userHitEnter = false;
						if(filteredResults && filteredResults.length ==1){
							//this.resolvePicker(filteredResults[0]);
							this.autoCompleteInput.closePanel();
							this.empTitle = filteredResults[0].title;
							this.resolvePicker(filteredResults[0]);
							tempResults = [];
						}else if(!this.isResolved){
							this.entryNotValid = true;
						}
					}
					this.numberOfActiveRequests-=1;
					return tempResults;
				}
				else if(this.userHitEnter&& !this.isResolved){
					this.entryNotValid = true;
				}
				this.numberOfActiveRequests-=1;
				return x;
				});
		  });
	}
	
	//Group level validator. it could perfeclty be a control level validator and mirror either true or false.
	static customPickerValidator(g:FormGroup){
		if(g.get('displayName').value){
			return g.get('isResolved').value?null:{"entryNotValid":true};
		}
		return null;
	}
	// static customPickerValidator(): ValidatorFn {
	  // return (control: AbstractControl): {[key: string]: any} => {
		// return control.value ? {'entryNotValid': {value: control.value}} : null;
	  // };
	// }
	
	//wait for the group property to be set for the control.
	ngOnInit(){
		if(this.requiredMessage){
			this.group.get('displayName').setValidators(Validators.required); 
		}
		//this.group.get('entryNotValid').setValidators(this.customPickerValidator);
		this.group.get('insideTextbox').valueChanges.subscribe(data => {
				if(this.group.get('insideTextbox').value){
				let sourceValue:string = this.group.get('insideTextbox').value;
				if  ((sourceValue.indexOf(';#')>0)&& sourceValue.length>(sourceValue.indexOf(';#')+2)){
					this.empTitle = sourceValue.split(';#')[1];
					this.userHitEnter = true;
					this.searchTermStream.next(this.empTitle);
				}
			}
			});
	}
	
	static buildItem(){
		return new FormGroup({
			insideTextbox: new FormControl(''), 
			displayName: new FormControl(''), 
			isResolved: new FormControl(false)
		}, TaxPeoplePickerComponent.customPickerValidator);
	}
	

	
}