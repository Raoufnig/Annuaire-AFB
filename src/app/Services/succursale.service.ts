import { Injectable } from '@angular/core';
import axios from 'axios';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class SuccursaleService {

  constructor() { }

  getListSuccursale(){
    return axios.get(URL.API_URL + '/succursale' + '/listsuccursale')
  }

  deleteSuccursale(succId:any, token: any){
    return axios.delete(URL.API_URL + '/succursale' + '/deletesuccursale/'+succId,{
      headers: {
        'Authorization' : 'Bearer '  + token, 
      }
     })
  }
}
