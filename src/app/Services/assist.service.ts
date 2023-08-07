import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../Classes/base-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AssistService {

  constructor(private http : HttpClient) { }

  getListVille(){

    return axios.get(URL.API_URL + '/ville' +'/listville');
  }

  getListPays(){

    return axios.get(URL.API_URL + '/pays' +'/listpays');
  }

  getListDirection(){

    return this.http.get(URL.API_URL + '/direction' +'/listdirection')
  }

  getListDepartement(){
    
    return axios.get(URL.API_URL + '/departement' +'/listdepartement')
  }

  getListNumero(){
    return axios.get(URL.API_URL + '/telephone' + '/listnumeros')
  }
  
  getListAdresse(){
    return axios.get(URL.API_URL + '/adresse' + '/listadresse')
  }

  getListRegion(){
    return axios.get(URL.API_URL + '/region' + '/listregion')
  }
}
