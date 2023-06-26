import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class ConfrereService {

  constructor(private http: HttpClient) { }


  getConfrere(){
    return this.http.get(URL.API_URL + '/confrere'+'/listconfrere');
  }

  deleteConfrere(Id: any){
    return this.http.get(URL.API_URL +'/confrere'+ '/deleteconf/'+ Id);
  }

}
