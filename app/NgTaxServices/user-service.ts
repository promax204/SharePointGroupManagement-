import { Injectable } from '@angular/core';
import {Dummy} from './dummy';

@Injectable()
/** Dummy version of an authenticated user service */
export class UserService {
 
  getUserName(): string{
	let 	dum = new Dummy();
	return 'Sherlock Holmes' +  dum.dummyValue;
  }
}