import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdTooltipModule} from '@angular/material';
import {MdAutocompleteModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdProgressBarModule} from '@angular/material';


import {TaxPeoplePickerComponent} from './tax-people-picker-component';
import {NgTaxServices} from '../NgTaxServices/ng-tax-services.module';
import {UserService} from '../NgTaxServices/user-service';
import {UrlService} from '../NgTaxServices/url-service';


import {SharepointListsWebService} from '../NgTaxServices/sharepoint-lists-web.service';

import { VehicleRegistrationReactiveComponent }  from './vehicle-registration-reactive.component';

@NgModule({
  imports:      [ BrowserModule,BrowserAnimationsModule,HttpModule,ReactiveFormsModule,FormsModule,
					NgTaxServices,MdTooltipModule ,MdAutocompleteModule,MdInputModule,MdProgressBarModule],
  declarations: [ VehicleRegistrationReactiveComponent,TaxPeoplePickerComponent],
  bootstrap:    [ VehicleRegistrationReactiveComponent ],
  providers: [UserService,SharepointListsWebService,UrlService],
})
export class VehicleRegistrationReactiveModule { }
