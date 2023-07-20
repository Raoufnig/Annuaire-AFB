import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from '../Classes/base-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  

  constructor(private http: HttpClient) { }

  getpersonnel( ){

     return axios.get(URL.API_URL+ '/personnel'+ '/listpersonnel')
     
  }

  addPersonnel(){
  

  }

  deletePersonnel(){

  }

  updatePersonnel(){

  }

}
