import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';


@Component({
  selector: 'nested-reactive-component',
  template: `
    <div class="taxPeoplePickerContainer" [formGroup]="group">
		<input type="text" [attr.id]="controlId" [formControlName]="controlKey" class="form-control taxPeoplePickerText">
		<div *ngIf="controlErrors" class="alert alert-danger">
			{{controlErrors}}
		</div>
	</div>
    `,
	styles:[`
	.taxPeoplePickerContainer{
		display:inline-block
		width:100%;
	}
	
	.taxPeoplePickerText{
			line-height:normal;
			padding-top:0px;
			padding-bottom:0px;
			height:25px;
	}
	
	input.ng-invalid  {
			border-left: 5px solid #a94442; /* red */
		}
	`]
})

export class NestedReactiveComponent implements OnInit {
 @Input()
 group:FormGroup;
 
 @Input()
 controlKey:string;
 
 @Input()
 controlId:string;
 
 @Input()
 requiredMessage:string;
 
 private controlErrors:string; 
 
 ///this hook is so  we run this code after all the control's properties have been set.
 ngOnInit(){
	if(this.requiredMessage){
		this.group.controls[this.controlKey].valueChanges.subscribe(data=> this.onValueChanged(data));
	}
 }

 onValueChanged(data?: any) {
		// clear previous error message (if any)
		this.controlErrors = '';
		const control = this.group.controls[this.controlKey];
		if (control && control.dirty && !control.valid ) {/*&& control.touched???*/
		  this.controlErrors = this.requiredMessage;
	  }
	} 
 /* static buildItem(required:boolean, internalProertyName){
	return new FormGroup({
		insideTextbox:required? new FormControl('', Validators.required): new FormControl('')
	});
 } */
}