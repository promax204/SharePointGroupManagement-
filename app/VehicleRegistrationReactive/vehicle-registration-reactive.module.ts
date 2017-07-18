import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms'; 


import {NgTaxServices} from '../NgTaxServices/ng-tax-services.module';
import {UserService} from '../NgTaxServices/user-service';
import {UrlService} from '../NgTaxServices/url-service';


import {SharepointListsWebService} from '../NgTaxServices/sharepoint-lists-web.service';

import { VehicleRegistrationReactiveComponent }  from './vehicle-registration-reactive.component';

@NgModule({
  imports:      [ BrowserModule,HttpModule,ReactiveFormsModule,NgTaxServices ],
  declarations: [ VehicleRegistrationReactiveComponent ],
  bootstrap:    [ VehicleRegistrationReactiveComponent ],
  providers: [UserService,SharepointListsWebService,UrlService],
})
export class VehicleRegistrationReactiveModule { }
