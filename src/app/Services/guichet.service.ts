import { Injectable } from '@angular/core';
import axios from 'axios';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class GuichetService {

  constructor() { }

  getListGuichet(){
    return axios.get(URL.API_URL+ '/guichet' + '/listguichet');
  }

  deleteGuichet(guichetId: any, token :any){
     return axios.delete(URL.API_URL+ '/guichet' + '/deleteguichet/'+ guichetId,{
      headers: {
        'Authorization' : 'Bearer '  + token, 
      }
     });
  }
}
