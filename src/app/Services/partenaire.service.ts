import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  constructor(private http: HttpClient) { }

  getPartenaire(){
    return axios.get(URL.API_URL + '/partenaire'+'/listpartenaire');
  }

  deletePartenaire(Id: any, token : any){
    return axios.delete(URL.API_URL +'/partenaire'+ '/deletepartenaire/'+Id,{
      headers: {
        'Authorization' : 'Bearer '  + token, 
      }
     });
  }
}
