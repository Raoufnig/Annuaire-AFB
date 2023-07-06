import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class CorrespondantService {

  constructor(private http: HttpClient) { }

  getCorrespondant(){
    return this.http.get(URL.API_URL + '/correspondant'+'/listcorrespondant');
  }

  updateCorrespondant(Id : any, form:any){
    this.http.put(URL.API_URL + '/correspondant'+'/updatecorrespondant/'+ Id, form);
  }

  deleteCorrespondant(Id: any){
    return this.http.get(URL.API_URL +'/correspondant'+ '/deletecorr/'+Id);
  }

  
}
