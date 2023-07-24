import { Injectable } from '@angular/core';
import axios from 'axios';
import { URL } from '../Classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class BureauService {

  constructor() { }

  getListBureau(){
    return axios.get(URL.API_URL+ '/bureau' + '/listbureau')
  }

  deleteBureau(bureauId:any){
    return axios.delete(URL.API_URL+ '/bureau' + '/deletebureau/' + bureauId)
  }
}
