import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';
import axios from 'axios';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class CorrespondantService {

  constructor(private http: HttpClient) { }

  getCorrespondant(){
    return axios.get(URL.API_URL + '/correspondant'+'/listcorrespondant');
  }

  updateCorrespondant(Id : any, form:any){
    axios.put(URL.API_URL + '/correspondant'+'/updatecorrespondant/'+ Id, form);
  }

  deleteCorrespondant(Id: any, token:any){
    return axios.delete(URL.API_URL +'/correspondant'+ '/deletecorr/'+Id,{
      headers: {
        'Authorization' : 'Bearer '  + token, 
      }
     });
  }

  
}
