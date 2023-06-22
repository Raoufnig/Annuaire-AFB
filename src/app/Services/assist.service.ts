import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class AssistService {

  constructor(private http : HttpClient) { }

  getListVille(){

    return this.http.get(URL.API_URL + '/ville' +'/listville');
  }

  getListPays(){

    return this.http.get(URL.API_URL + '/pays' +'/listpays');
  }

  getListDirection(){

    return this.http.get(URL.API_URL + '/direction' +'/listdirection')
  }

  getListDepartement(){
    
    return this.http.get(URL.API_URL + '/departement' +'/listdepartement')
  }
}
