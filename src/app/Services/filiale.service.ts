import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FilialeService {

  constructor(private http: HttpClient) { }

  getFiliale(){
    return axios.get(URL.API_URL + '/filiale'+'/listfiliale');
  }

  deleteFiliale(Id: any, token: any){
    return axios.delete(URL.API_URL +'/filiale'+ '/deletefiliale/'+Id, {
      headers: {
        'Authorization' : 'Bearer '  + token, 
      }
     });
  }
}
