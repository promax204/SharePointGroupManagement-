import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { FormsModule }   from '@angular/forms'; 

import { VehicleRegistrationComponent }  from './vehicle-registration.component';

@NgModule({
  imports:      [ BrowserModule,HttpModule,FormsModule ],
  declarations: [ VehicleRegistrationComponent ],
  bootstrap:    [ VehicleRegistrationComponent ]
})
export class VehicleRegistrationModule { }
