import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from  '@angular/forms';

import { WebPart2Component }  from './wp2.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ WebPart2Component ],
  bootstrap:    [ WebPart2Component ]
})
export class Wp2Module { }
