import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'form-data',
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  constructor(private http: HttpClient ) { }

  getAgence(){
    return this.http.get(URL.API_URL + '/agence'+'/listagence');
  }

  addAgence(form : any){

   

  }
}
