import { Injectable } from '@angular/core';
import axios from 'axios';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  constructor() { }

  getListDirection(){
    return axios.get(URL.API_URL + '/direction' +'/listdirection')
  }

  deleteDirection(Id: any, token:any){
    return axios.delete(URL.API_URL +'/direction'+ '/deletedirection/'+Id,{
      headers: {
        'Authorization' : 'Bearer '  + token, 
      }
     });
  }

}
