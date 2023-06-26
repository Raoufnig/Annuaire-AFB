import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  

  constructor(private http: HttpClient) { }

  getpersonnel( ): Observable<any>{

    return this.http.get(URL.API_URL+ '/personnel'+ '/listpersonnel')
     
  }

  addPersonnel(){
  

  }

  deletePersonnel(){

  }

  updatePersonnel(){

  }

}
