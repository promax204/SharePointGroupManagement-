import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var $:any;

import {TaxSpUser} from './tax-sp-user';


@Injectable()
export class SharepointUserGroupWebService{
	constructor(private http: Http) { }
	private serviceUrl = '_vti_bin/UserGroup.asmx';
	private xmlPayloadWrapperStart = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>`;
	private xmlPayloadWrapperEnd = '</soap12:Body></soap12:Envelope>';
	private headers = new Headers({
								 'Content-Type': 'application/soap+xml; charset=utf-8',
							 });
	private getUserLoginFromEmailPayload = `<GetUserLoginFromEmail xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/"><emailXml><Users><User Email="emailString"/></Users></emailXml></GetUserLoginFromEmail>`;
	
	getUserLoginFromEmail(emailString:string, siteurl:string):Promise<TaxSpUser>{
		let requestBody=this.xmlPayloadWrapperStart+this.getUserLoginFromEmailPayload+this.xmlPayloadWrapperEnd;
		requestBody = requestBody.replace("emailString", emailString);
		return this.http.post(siteurl+this.serviceUrl, requestBody, {headers:this.headers})
		.toPromise()
		.then(function(res){
			let x:any= $(res.text()).find("User").first();
			return {id:x.attr('SiteUser'),displayName:x.attr('DisplayName'), login:x.attr('Login'), email:x.attr('Email')};
		})
		.catch(this.handleError);
	}
	
	private handleError(error: any): Promise<any> {
	
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}