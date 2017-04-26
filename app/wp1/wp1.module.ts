import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import { WebPart1Component }  from './wp1.component';

@NgModule({
  imports:      [ BrowserModule,HttpModule ],
  declarations: [ WebPart1Component ],
  bootstrap:    [ WebPart1Component ]
})
export class Wp1Module { }
