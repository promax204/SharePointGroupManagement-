import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';


@Component({
    selector: 'vehicle-registration',
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
	`],
    template: `
		<form (ngSubmit)="onSubmit()" #vehicleForm="ngForm">
		<div class="SpTaxGeneral">
			<div class="InlineDiv" style="width:20%;">
				<img id="imgTax" src="/siteassets/img/ODTLogo.jpg" alt="Tax Logo" />
			</div>
			<div class="InlineDiv" style="float:right;text-align:right;vertical-align:top;width:78%;">
					<div class="SpTaxFormTitle"> 
						<h3>{{FormTitle}}</h3>
					</div>
					<div class="SpTaxFormId">
						ID#:  <input class="SpTaxTextbox" type="text" disabled="disabled" />
					</div>
			</div>
			<div class="SpTaxTitleBar">
				<h4>
					Employee Information
				</h4>
			</div>
			<div class="form-horizontal SpTaxFormContainer"> 
				<div class="form-group">
					<label class="control-label col-sm-4"  for="TaxVehicleEmployeeName">Employee Name: </label>
					<div class="col-sm-8"  >
						<input id="TaxVehicleEmployeeName" name="TaxVehicleEmployeeName" type="text" class="form-control" placeholder="Enter Employee Name" [(ngModel)]="EmployeeName" required="required"/>
						<div *ngIf="formErrors.TaxVehicleEmployeeName" class="alert alert-danger">
								{{formErrors.TaxVehicleEmployeeName}}
						</div>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-4" >Employee Number: </label>
					<div class="col-sm-8"  >
						<input type="text" class="form-control" placeholder="Enter Employee Number" />
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-4" >Work Phone Number: </label>
					<div class="col-sm-8"  >
						<input type="tel" class="form-control" placeholder="Enter Work Phone Number" />
					</div>
				</div>
				<div class="form-group">
					<label for="TaxVehicleEmail" id="TaxVehicleEmail"  class="control-label col-sm-4" >Email Address: </label>
					<div class="col-sm-8"  >
						<input name="TaxVehicleEmail" [(ngModel)]="EmployeeEmail" type="email" class="form-control" placeholder="Enter Email Address" required="required" />
						<div *ngIf="formErrors.TaxVehicleEmail" class="alert alert-danger">
								{{formErrors.TaxVehicleEmail}}
						</div>
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
							<label class="control-label col-sm-4" >Year: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Year" />
							
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >Make: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Make" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >Model: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Model" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >Color: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Color" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >License Plate Number: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter License Plate Number" />
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="row SpTaxFormContainer">
						<div class="form-group">
							<label class="control-label col-sm-4" >Year: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Year" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >Make: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Make" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >Model: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Model" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >Color: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Color" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >License Plate Number: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter License Plate Number" />
							</div>
						</div>
					</div>		
				</div>
				<div class="col-sm-4">
					<div class="row SpTaxFormContainer">
						<div class="form-group">
							<label class="control-label col-sm-4" >Year: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Year" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >Make: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Make" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >Model: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Model" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >Color: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter Color" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" >License Plate Number: </label>
							<div class="col-sm-8"  >
								<input type="text" class="form-control" placeholder="Enter License Plate Number" />
							</div>
						</div>
					</div>		
				</div>	
			</div>
			<div class="SpTaxTitleBar">
				<h4>
					Handicap Permit (Check for Yes) <input type="checkbox" [(ngModel)]="HasHandicap" name="HasHandicap" />
				</h4>
			</div>
			<div *ngIf="HasHandicap" class="form-horizontal SpTaxFormContainer"> 
				<div class="form-group">
					<label class="control-label col-sm-4" >Handicap (HC) Parking Permit Registration #: </label>
					<div class="col-sm-8"  >
						<input  type="text" class="form-control" placeholder="Handicap (HC) Parking Permit Registration #" />
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-4" >Placard Number: </label>
					<div class="col-sm-8"  >
						<input type="text" class="form-control" placeholder="Placard Number:" />
					</div>
				</div>
			</div> 
			<div class="SpTaxAlginCenter">
				<button type="submit" class="SpTaxButton" [disabled]="!vehicleForm.form.valid">Submit</button>
				<input type="button" class="SpTaxButton" value="Exit Without Saving" />
			</div>
			
		</div>
		</form>
	`
})
export class VehicleRegistrationComponent {
    FormTitle: string = 'Vehicle Registration Form';
	HasHandicap = false;
	EmployeeName = 'Jorge Gutierrez';
	EmployeeEmail:string;
	vehicleForm:NgForm;
	@ViewChild('vehicleForm') 
	currentForm: NgForm;
	
	ngAfterViewChecked() {
	  this.formChanged();
	}

	formChanged() {
	  if (this.currentForm === this.vehicleForm) { return; }
	  this.vehicleForm = this.currentForm;
	  if (this.vehicleForm) {
		this.vehicleForm.valueChanges
		  .subscribe(data => this.onValueChanged(data));
	  }
	}
	
	onValueChanged(data?: any) {
	  if (!this.vehicleForm) { return; }
	  const form = this.vehicleForm.form;

	  for (const field in this.formErrors) {
		// clear previous error message (if any)
		this.formErrors[field] = '';
		const control = form.get(field);

		if (control && control.dirty && !control.valid) {
		  const messages = this.validationMessages[field];
		  for (const key in control.errors) {
			this.formErrors[field] += messages[key] + ' ';
		  }
		}
	  }
	}

	formErrors = {
	  'TaxVehicleEmployeeName': '',
	  'TaxVehicleEmail':''
	};
	
	validationMessages = {
	  'TaxVehicleEmployeeName': {
		'required':      'Employee Name is required.',
		'minlength':     'Employee Name must be at least 4 characters long.',
		'maxlength':     'Employee Name cannot be more than 24 characters long.',
		'forbiddenName': 'Someone named "Bob" cannot be a hero.'
	  },
	  'TaxVehicleEmail': {
		'required': 'Employee Email is required.'
	  }
	};
	
	
}