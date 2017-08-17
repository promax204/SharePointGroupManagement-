import {Component} from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import {OnInit} from '@angular/core';

import {UserService} from '../NgTaxServices/user-service';
import {SharepointListsWebService} from '../NgTaxServices/sharepoint-lists-web.service';
import {UrlService} from '../NgTaxServices/url-service';
import {NestedReactiveComponent} from './nested-reactive-component';



import {VehicleRegistrationBusiness} from './vehicle-registration-business';
import {VehicleRegistrationListItem} from './vehicle-registration-list-entry';


@Component({
    selector: 'vehicle-registration-reactive',
	styles: [`
		.SpTaxGeneral{
			background-color:#D8D8D8;
			width:700px;
			font-weight:700;
			border:solid black 1px;
			margin: 0 auto;
		}
		.InlineDiv{
			display:inline-block;
		}
		.SpTaxGeneral input[type="text"]:disabled {
			background: #BFBFBF;
		}
		.SpTaxTextbox{
			border: 1px solid black;
		}
		.SpTaxFormTitle{
			border-bottom:1px solid black;
			padding-right:16px;
		}
		.SpTaxFormTitle h3{
			margin-top:5px;
			margin-bottom:5px;
			font-size:1.7em;
		}
		.SpTaxFormId{
			margin-top:7px;
			padding-right:16px;
		}
		.SpTaxFormId input{
			width:90px;
		}
		.SpTaxAlginCenter{
			text-align:center;
		}
		#imgTax{
			z-index:100;
		}
		.SpTaxTitleBar{
			border-top:1px solid black;
			background-color: #810124;
			color:white;
			padding: 3px 0px 3px 15px;
			margin-right:0px;
			margin-left:0px;
		}
		.SpTaxTitleBar h4{
			margin-bottom:0px;
			margin-top:0px;
			font-weight:bold;
			font-size:1.7em;
		}
		.SpTaxFormContainer{
			padding:5px 10px 5px 10px;
		}
		.SpTaxFormContainer .form-group{
			margin-right:5px;
			margin-left:3px;
			border-top:1px solid black;
			border-right:1px solid black;
			border-left:1px solid black;
			margin-top:0px;
			margin-bottom:0px;
			overflow:auto;
		}
		
		.SpTaxFormContainer .form-group:last-child{
			border-bottom:1px solid black;
		}
		
		.SpTaxFormContainer .form-group>div{
			border-left:1px solid black;
			padding: 5px 10px 5px 10px;
		}
		
		.SpTaxFormContainer .form-group label{
			padding-top:8px;
		}
		
		.SpTaxFormContainerdiv{
			border:1px solid black;
		}
		.SpTaxLowerFormContainer{
			padding:5px 25px 5px 25px;
		}
		.SpTaxLowerFormContainer .SpTaxFormContainer{
			padding:0px 0px 0px 0px;
		}
		.SpTaxLowerTitleBar{
			padding-left: 5px;
		}

		.SpTaxLowerTitleBar div{
			padding-left:0px;
		}
		.SpTaxButton{
			margin:7px 2px 7px 2px;
		}
		.SpTaxGeneral input[type=text].form-control, 
		.SpTaxGeneral input[type=tel].form-control, 
		.SpTaxGeneral input[type=email].form-control{
			line-height:normal;
			padding-top:0px;
			padding-bottom:0px;
			height:25px;
		}
/*		
		.ng-valid[required], .ng-valid.required  {
			border-left: 5px solid #42A948; /* green 
		}

	*/	.ng-invalid:not(form)  {
			border-left: 5px solid #a94442; /* red */
		}
		
		.SpTaxFormContainer .taxNoOverflow{
			overflow:visible;
		}
	`],
    template: `
		
		<form [formGroup]="vehicleFormData" (ngSubmit)="onSubmit()" novalidate>
		<div class="SpTaxGeneral">
			<div class="InlineDiv" style="width:20%;">
				<img id="imgTax" src="/siteassets/img/ODTLogo.jpg" alt="Tax Logo" />
			</div>
			<div class="InlineDiv" style="float:right;text-align:right;vertical-align:top;width:78%;">
					<div class="SpTaxFormTitle"> 
						<h3>{{FormTitle}}</h3>
					</div>
					<div class="SpTaxFormId">
						ID#:  <input class="SpTaxTextbox" style="text-align:right" type="text" formControlName="ID" />
					</div>
			</div>
			
			<div *ngIf="!(idSubmitted)">
				<div class="SpTaxTitleBar">
					<h4>
						Employee Information
					</h4>
				</div>
				<div class="form-horizontal SpTaxFormContainer"> 
					<div class="form-group">
						<label class="control-label col-sm-4"  for="TaxVehicleEmployeeName">Employee Name: </label>
						<div class="col-sm-8"  >
							<input mdTooltip="Enter an employee's name" mdTooltipPosition="above" id="TaxVehicleEmployeeName" type="text" class="form-control" formControlName="EmployeeName" />
							<div *ngIf="formErrors.EmployeeName" class="alert alert-danger">
								{{formErrors.EmployeeName}}
							</div>
						</div>

					</div>
					<div class="form-group taxNoOverflow">
						<label class="control-label col-sm-4"  for="TaxVehicleEmployeeName">Employee Name: </label>
						<div class="col-sm-8"  >
							<people-picker></people-picker>
							
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-4" for="TaxVehicleEmployeeNumber" >Employee Number: </label>
						<div class="col-sm-8"  >
							<nested-reactive-component mdTooltip="Enter Employee Number" controlId="TaxVehicleEmployeeNumber" controlKey="insideTextbox"  [requiredMessage]="validationMessages.EmployeeNumber.required" [group]="vehicleFormData.get('EmployeeNumber')"></nested-reactive-component>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-4" for="TaxVehicleEmployeePhone" >Work Phone Number: </label>
						<div class="col-sm-8"  >
							<input type="tel" id="TaxVehicleEmployeePhone" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Work Phone Number"  formControlName="EmployeePhone" required />
							<div *ngIf="formErrors.EmployeePhone" class="alert alert-danger">
								{{formErrors.EmployeePhone}}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-4" for="TaxVehicleEmployeeEmail" >Email Address:</label>
						<div class="col-sm-8"  >
							<input type="tel" id="TaxVehicleEmployeeEmail" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Email Address"  formControlName="EmployeeEmail" />
							<div *ngIf="formErrors.EmployeeEmail" class="alert alert-danger">
								{{formErrors.EmployeeEmail}}
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-4" for="TaxVehicleDummyPerson" >Dummy Person:</label>
						<div class="col-sm-8"  >
							<nested-reactive-component mdTooltip="Enter Dummy Person" controlId="TaxVehicleDummyPerson" controlKey="insideTextbox"  [requiredMessage]="validationMessages.EmployeePerson.required" [group]="vehicleFormData.get('EmployeePerson')"></nested-reactive-component>
						</div>
					</div>
				</div>
				<div class="SpTaxTitleBar SpTaxLowerTitleBar row">
					<div class="InlineDiv col-sm-4" style="padding-left:12px" >
						<h4 >
							Vehicle 1
						</h4>
					</div>
					<div class="InlineDiv col-sm-4"  style="padding-left:6px;" >
						<h4 >
							Vehicle 2
						</h4>
					</div>
					<div class="InlineDiv col-sm-4" style="" >
						<h4 >
							Vehicle 3
						</h4>
					</div>
				</div>
				<div class="row SpTaxLowerFormContainer"> 
					<div class="col-sm-4">
						<div class="row SpTaxFormContainer">
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle1Year" >Year: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle1Year" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Year" formControlName="Vehicle1Year" maxLength="4"/>
									<div *ngIf="formErrors.Vehicle1Year" class="alert alert-danger">
										{{formErrors.Vehicle1Year}}
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle1Make" >Make: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle1Make" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Make" formControlName="Vehicle1Make" />
									<div *ngIf="formErrors.Vehicle1Make" class="alert alert-danger">
										Required
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle1Model" >Model: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle1Model" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Model" formControlName="Vehicle1Model" />
									<div *ngIf="formErrors.Vehicle1Model" class="alert alert-danger">
										Required
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle1Color" >Color: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle1Color" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Color" formControlName="Vehicle1Color" />
									<div *ngIf="formErrors.Vehicle1Color" class="alert alert-danger">
										Required
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle1LicensePlate" >License Plate Number: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle1LicensePlate" class="form-control" mdTooltipPosition="above" mdTooltip="Enter License Plate Number" formControlName="Vehicle1LicensePlate" />
									<div *ngIf="formErrors.Vehicle1LicensePlate" class="alert alert-danger">
										Required
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="row SpTaxFormContainer">
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle2Year">Year: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle2Year" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Year" formControlName="Vehicle2Year"  maxLength="4"/>
									<div *ngIf="formErrors.Vehicle2Year" class="alert alert-danger">
										{{formErrors.Vehicle2Year}}
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle2Make" >Make: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle2Make" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Make" formControlName="Vehicle2Make" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle2Model" >Model: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle2Model" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Model" formControlName="Vehicle2Model" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle2Color">Color: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle2Color" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Color" formControlName="Vehicle2Color" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle2LicensePlate">License Plate Number: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle2LicensePlate" class="form-control" mdTooltipPosition="above" mdTooltip="Enter License Plate Number" formControlName="Vehicle2LicensePlate" />
								</div>
							</div>
						</div>		
					</div>
					<div class="col-sm-4">
						<div class="row SpTaxFormContainer">
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle3Year" >Year: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle3Year" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Year" formControlName="Vehicle3Year"  maxLength="4"/>
									<div *ngIf="formErrors.Vehicle3Year" class="alert alert-danger">
										{{formErrors.Vehicle3Year}}
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle3Make" >Make: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle3Make" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Make" formControlName="Vehicle3Make" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle3Model" >Model: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle3Model" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Model" formControlName="Vehicle3Model" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle3Color">Color: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle3Color" class="form-control" mdTooltipPosition="above" mdTooltip="Enter Color" formControlName="Vehicle3Color" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="TaxVehicle3LicensePlate">License Plate Number: </label>
								<div class="col-sm-8"  >
									<input type="text" id="TaxVehicle3LicensePlate" class="form-control" mdTooltipPosition="above" mdTooltip="Enter License Plate Number" formControlName="Vehicle3LicensePlate" />
								</div>
							</div>
						</div>		
					</div>	
				</div>
				<div class="SpTaxTitleBar">
					<h4>
						Handicap Permit (Check for Yes) <input type="checkbox" formControlName="HasHandicapPermit" />
					</h4>
				</div>
				<div *ngIf="vehicleFormData.get('HasHandicapPermit').value"  class="form-horizontal SpTaxFormContainer"> 
					<div class="form-group">
						<label class="control-label col-sm-4" for="TaxVehicleHandicapPermitRegistration" >Handicap (HC) Parking Permit Registration #: </label>
						<div class="col-sm-8"  >
							<input  type="text" class="form-control" id="TaxVehicleHandicapPermitRegistration" mdTooltipPosition="above" mdTooltip="Handicap (HC) Parking Permit Registration #" formControlName= "HandicapPermitRegistration" />
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-4" for="TaxVehiclePlacardNumber" >Placard Number: </label>
						<div class="col-sm-8"  >
							<input type="text" class="form-control" id="TaxVehiclePlacardNumber" mdTooltipPosition="above" mdTooltip="Placard Number:"  formControlName = "HandicapPlacardNumber"/>
						</div>
					</div>
				</div> 
				<div class="SpTaxAlginCenter">
					<button type="submit" [disabled]="vehicleFormData.pristine || vehicleFormData.status=='INVALID' || thinking"  class="SpTaxButton btn">Submit</button>
					<input type="button" class="SpTaxButton btn"  value="Exit Without Saving" (click)="exit();" />
				</div>
			</div>
			<div *ngIf="idSubmitted">
				<div class="SpTaxTitleBar SpTaxAlginCenter">
					<h4>
						Thank You!!!
					</h4>
				</div>
				<div class="SpTaxAlginCenter SpTaxFormContainer">
					<p>Your form has been submitted.</p>
					<input type="button" class="SpTaxButton btn"  value="Exit" (click)="exit();" />
				</div>
			</div>
			
		</div>
		{{vehicleFormData.value|json}}
		
		</form>
		
	`
})
export class VehicleRegistrationReactiveComponent implements OnInit {
	FormTitle:string='Vehicle Registration Form';
	vehicleFormData:  FormGroup;
	vehicleRegistrationBusiness:VehicleRegistrationBusiness; 
	thinking: boolean = false;
	idSubmitted: string ='';


	constructor(private fb:FormBuilder, 
				private sharepointListsWebService:SharepointListsWebService,
				private urlService: UrlService){ 
		this.createForm();
		this.vehicleRegistrationBusiness = new VehicleRegistrationBusiness(sharepointListsWebService);
	}
	
	/*this lifecycle hook will load all the data from the Sharepoint list.*/
	ngOnInit(): void {
		if(this.urlService.getItemId()){
				this.vehicleRegistrationBusiness.loadItem(this.urlService.getItemId()).then(result=>{
					if(result){
						let castedResult : VehicleRegistrationListItem[];
						castedResult = <VehicleRegistrationListItem[]>result;						
						
						
						this.vehicleFormData.patchValue(castedResult[0])
						//Form groups:
						this.vehicleFormData.get('EmployeeNumber.insideTextbox').patchValue(castedResult[0]['EmployeeNumber'])
						this.vehicleFormData.get('EmployeePerson.insideTextbox').patchValue(castedResult[0]['EmployeePerson'])
					}
				});
		}
	}
	 
	createForm() {
		this.vehicleFormData = this.fb.group({
		ID: {value: '', disabled: true},
		  EmployeeName:   ['',     Validators.required]	, 
		  EmployeeNumber:  this.fb.group({insideTextbox:['', Validators.required]}),
		  EmployeePhone:  ['',     Validators.required],
		  EmployeeEmail:  ['', 	   Validators.required],
		  EmployeePerson: this.fb.group({insideTextbox:'' additionalTextbox:''}),
		  
		  Vehicle1Year :  ['', 	  [ Validators.required,  Validators.pattern('[0-9]{4}')]],
		  Vehicle1Make :  ['', 	   Validators.required],
		  Vehicle1Model :  ['', 	   Validators.required],
		  Vehicle1Color :  ['', 	   Validators.required],
		  Vehicle1LicensePlate :  ['', 	   Validators.required],	  
		  
		  Vehicle2Year :  ['',Validators.pattern('[0-9]{4}')],
		  Vehicle2Make :  '',
		  Vehicle2Model :  '',
		  Vehicle2Color :  '',
		  Vehicle2LicensePlate :  '',
		  
		  Vehicle3Year :   ['',Validators.pattern('[0-9]{4}')],
		  Vehicle3Make :  '',
		  Vehicle3Model :  '',
		  Vehicle3Color :  '',
		  Vehicle3LicensePlate :  '',
		  
		  HasHandicapPermit: false, 
		  HandicapPermitRegistration: '',
		  HandicapPlacardNumber: '', 
		  
		});
		this.vehicleFormData.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged();
	}
	
	
	onSubmit(){
	
		//implemented from : 
		//https://angular.io/guide/reactive-forms#save
		let formDictionary : [string, string][] = [];
		this.thinking  = true;
		Object.keys(this.vehicleFormData.controls).forEach(key => 
		//there is a chance to 'preprocess' items here, or skip them if need to.
			formDictionary.push([key,
			this.vehicleFormData.get((key == "EmployeeNumber"|| key =="EmployeePerson")?key+".insideTextbox":key).value]));
		this.vehicleRegistrationBusiness.addOrUpdateListItem(formDictionary).then(
		(id)=>{ 
			this.thinking = false;
			this.vehicleFormData.patchValue({ID:id});
			this.idSubmitted = id+"";			
		});	
	}	
	
	exit(){
		this.urlService.navigateToDefaultSource();
	}
	
	onValueChanged(data?: any) {
	  if (!this.vehicleFormData) { return; }
	  const form = this.vehicleFormData;

	  for (const field in this.formErrors) {
		// clear previous error message (if any)
		this.formErrors[field] = '';
		const control = form.get(field.replace('_', '.'));

		if (control && control.dirty && !control.valid ) {/*&& control.touched???*/
		  const messages = this.validationMessages[field];
		  for (const key in control.errors) {
			this.formErrors[field] += messages[key] + ' ';
		  }
		}
	  }
	}
	
	formErrors = {
	  'EmployeeName': '',
	  //'EmployeeNumber_insideTextbox':'',
	  'EmployeePhone':'',
	  'EmployeeEmail':'', 
	  'Vehicle1Year' :  '',
	'Vehicle1Make': '',
	'Vehicle1Model' :  '',
    'Vehicle1Color' :  '',
	'Vehicle1LicensePlate' :  '',
	'Vehicle2Year' :  '',
	'Vehicle3Year' :  ''
	};
	
	validationMessages = {
	  'EmployeeName': {
		'required':      'Employee Name is required.'
	/*	These ones are not needed for now:
		'minlength':     'Employee Name must be at least 4 characters long.',
		'maxlength':     'Employee Name cannot be more than 24 characters long.',
		'forbiddenName': 'Someone named "Bob" cannot be a hero.'*/
	  },
	  'EmployeeNumber': {'required': 'Employee Number is required.'},
	  'EmployeePerson': {'required': 'A selection of an employee is required.'},
	  'EmployeePhone': {'required': 'Work Phone Number is required.'},
	  'EmployeeEmail': {'required': 'Email Address is required.'},
	'Vehicle1Year' :  {'required': 'Required', 'pattern':'Enter a 4 digit year'},
	'Vehicle1Make': {'required': 'Required'},
	'Vehicle1Model' :  {'required': 'Required'},
    'Vehicle1Color' :  {'required': 'Required'},
	'Vehicle1LicensePlate' :  {'required': 'Required'},
	'Vehicle2Year' :  {'pattern':'Enter a 4 digit year'},
	'Vehicle3Year' :  {'pattern':'Enter a 4 digit year'},
	};
}