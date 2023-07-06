import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { error } from 'jquery';
import { URL } from 'src/app/Classes/base-url';
import { AssistService } from 'src/app/Services/assist.service';
import { FilialeService } from 'src/app/Services/filiale.service';

@Component({
  selector: 'app-filiale',
  templateUrl: './filiale.component.html',
  styleUrls: ['./filiale.component.scss']
})
export class FilialeComponent implements OnInit {
  ShowNavbar=false;
  listfiliale: any;
  filtrecat: any;
  actionDelete = false;
  deleted = false;
  listpays : any;
  searchText!: string;
  currentPage = 1;
  enregistreur = "Enregistrer"; 
  create = false;
  loader = false;
  filialeForm!: FormGroup;
  isOpen=false;

  constructor(private assistService: AssistService, private filialeService : FilialeService, private http : HttpClient, private router : Router){
    this.filialeForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      bic: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.pattern(/^\d{10}$/)),
      site_web: new FormControl('', Validators.required)

    });
  }

  ngOnInit() {
    this.getListPays();
    this.getListFiliale();
  }

getListPays(){
  this.assistService.getListPays().subscribe((res)=>{
    this.listpays=res;
    
  })
}

getListFiliale(){
  this.filialeService.getFiliale().subscribe((res)=>{
    this.listfiliale=res;

    this.filtrecat=res;
    console.log(this.filtrecat)
  })
}

deleteFiliale(idFiliale:any){
  //this.actionDelete= true;
  this.filialeService.deleteFiliale(idFiliale).subscribe((res)=>{
     
    
  }, (error)=>{
    console.log(error.error.text);
    //window.location.reload();
    
  })
  this.deleted = true;
}

deleteFiliale2(idFiliale:any){
  this.filialeService.deleteFiliale(idFiliale).subscribe((res)=>{
     
    
  }, (error)=>{
    console.log(error.error.text);
    window.location.reload();
    //window.location.reload();
    
  })
}

searchByName(){
  this.filtrecat = this.listfiliale.filter((mot: any) => mot.nom.toLowerCase().includes(this.searchText.toLowerCase()));
}

  onSubmit() {

    let result = {
      bic : this.filialeForm.value.bic,
      fax : this.filialeForm.value.fax,
      nom : this.filialeForm.value.nom,
      phone : this.filialeForm.value.telephone,
      site: this.filialeForm.value.site_web,
      pays: this.filialeForm.value.pays

    }

    const nig = JSON.stringify(result);
    this.loader = true;
    axios.post(URL.API_URL + '/filiale' + '/addfiliale',nig,{
       headers : {
        'Content-Type': 'application/json'

       } }).then((res)=>{
        console.log(res.data);
        this.create = true;
        this.loader = false;
        setTimeout(() => {
          window.location.reload()
        }, 1500);

     }).catch((error)=>{
      this.create = false;
      this.loader = false;
     // console.log(error);
       
    })

  }
}
