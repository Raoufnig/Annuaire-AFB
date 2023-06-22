import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class CorrespondantService {

  constructor(private http: HttpClient) { }

  getCorrespondant(){
    return this.http.get(URL.API_URL + '/correspondant'+'/listcorrespondant');
  }
}
