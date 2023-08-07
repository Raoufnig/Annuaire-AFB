import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ConfrereService {

  constructor() { }


  getConfrere(){
    return axios.get(URL.API_URL + '/confrere'+'/listconfrere');
  }

  deleteConfrere(Id: any, token : any){
    return axios.delete(URL.API_URL +'/confrere'+ '/deleteconf/'+ Id,{
      headers: {
        'Authorization' : 'Bearer '  + token, 
      }
     });
  }

}
