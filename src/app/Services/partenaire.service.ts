import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  constructor(private http: HttpClient) { }

  getPartenaire(){
    return this.http.get(URL.API_URL + '/partenaire'+'/listpartenaire');
  }

  deletePartenaire(Id: any){
    return this.http.get(URL.API_URL +'/partenaire'+ '/deletepartenaire/'+Id);
  }
}
