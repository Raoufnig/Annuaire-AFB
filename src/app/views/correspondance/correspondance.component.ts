import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { URL } from 'src/app/Classes/base-url';
import { AssistService } from 'src/app/Services/assist.service';
import { CorrespondantService } from 'src/app/Services/correspondant.service';

@Component({
  selector: 'app-correspondance',
  templateUrl: './correspondance.component.html',
  styleUrls: ['./correspondance.component.scss']
})
export class CorrespondanceComponent implements OnInit {
  ShowNavbar=false;
  listcorrespondant : any;
  listpays:any;
  isOpen = false;
  actionDelete =false;
  currentPage = 1;
  correspondantForm! : FormGroup


  constructor(private correspondantService: CorrespondantService, private http: HttpClient, private assistService : AssistService){
    this.correspondantForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      site_web: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required)

    });
  }

  ngOnInit() {
    this.getListPays();
    this.getListCorrespondant();
    
  }
  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  getListPays(){
    this.assistService.getListPays().subscribe((res)=>{
      this.listpays=res;
    })
  }

  getListCorrespondant(){
    this.correspondantService.getCorrespondant().subscribe((res)=>{
      this.listcorrespondant=res;
    })
  }

  onSubmit() {
    console.log(this.correspondantForm.value);

    let result = {
      fax : this.correspondantForm.value.fax,
      manager : this.correspondantForm.value.manager,
      nom: this.correspondantForm.value.nom,
      pays: this.correspondantForm.value.pays,
      phone: this.correspondantForm.value.telephone,
      site: this.correspondantForm.value.site_web
      
    }

    const nig = JSON.stringify(result);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post(URL.API_URL + '/correspondant' + '/addcorrespondant',nig,{ headers }).subscribe((res)=>{

    },(error)=>{
      console.log(error);
    }); 

  }

  deleteCorrespondant(id: any){
    this.actionDelete = true;
    this.correspondantService.deleteCorrespondant(id).subscribe((res)=>{
        
      this.actionDelete = false;
      window.location.reload;
    
    }, (error)=>{
      console.log(error);
    });
  }

  Update(){

  }

}
