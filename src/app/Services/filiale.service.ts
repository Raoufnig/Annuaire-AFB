import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class FilialeService {

  constructor(private http: HttpClient) { }

  getFiliale(){
    return this.http.get(URL.API_URL + '/filiale'+'/listfiliale');
  }

  deleteFiliale(Id: any){
    return this.http.get(URL.API_URL +'/filiale'+ '/deletefiliale/'+Id);
  }
}
