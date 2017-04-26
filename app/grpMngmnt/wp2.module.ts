import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from  '@angular/forms';
import {HttpModule} from '@angular/http';

import { WebPart2Component }  from './wp2.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ,HttpModule],
  declarations: [ WebPart2Component ],
  bootstrap:    [ WebPart2Component ]
})
export class Wp2Module { }
