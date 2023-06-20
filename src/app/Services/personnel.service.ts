import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  

  constructor(private http: HttpClient) { }

  getpersonnel( url : string): Observable<any>{

    return this.http.get(url)
     
  }

  addPersonnel(){
    

  }

  deletePersonnel(){

  }

  updatePersonnel(){

  }

}
