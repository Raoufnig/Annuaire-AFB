import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';
import axios from 'axios';

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
    return axios.get(URL.API_URL + '/agence'+'/listagence');
  }

  addAgence(form : any){

   

  }
}
