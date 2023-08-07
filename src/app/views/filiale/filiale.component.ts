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
  update = false;
  messageSuccess!:string
  currentPage = 1;
  enregistreur = "Enregistrer"; 
  create = false;
  loader = false;
  filialeForm!: FormGroup;
  isOpen=false;
  userInfo: any;
  storeData: any;
  statusUser=false;
  statut:any;

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
    this.storeData = localStorage.getItem("UserInfo")
    this.userInfo = JSON.parse(this.storeData);
    this.statusUser=this.userInfo.userDetails.enabled;
    this.statut =this.userInfo.group;
  }

getListPays(){
  this.assistService.getListPays().then((res)=>{
    this.listpays=res.data;
    
  })
}

getListFiliale(){
  this.filialeService.getFiliale().then((res)=>{
    this.listfiliale=res.data;

    this.filtrecat=res.data;
    console.log(this.filtrecat)
  })
}

deleteFiliale(idFiliale:any){
  //this.actionDelete= true;
  this.filialeService.deleteFiliale(idFiliale, this.userInfo.jwt).then((res)=>{
     
    
  }).catch((error)=>{
    console.log(error.error.text);
    //window.location.reload();

  })
  this.deleted = true;
}

deleteFiliale2(idFiliale:any){
  this.filialeService.deleteFiliale(idFiliale, this.userInfo.jwt).then((res)=>{
    window.location.reload();
    
  }).catch((error)=>{
    console.log(error.error.text);
    
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
        'Authorization' : 'Bearer '  + this.userInfo.jwt,
        'Content-Type': 'application/json'

       } }).then((res)=>{
        console.log(res.data);
        this.messageSuccess= res.data;
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

  onUpdate(filiale : any) {
    let fil = filiale;
    console.log(fil);
   
    if(this.filialeForm.value.bic == ''){
      this.filialeForm.value.bic = fil.bic; 
    }
    if(this.filialeForm.value.site_web == ''){
      this.filialeForm.value.site_web = fil.site; 
    }
    if(this.filialeForm.value.fax == ''){
      this.filialeForm.value.fax = fil.fax; 
    }
    if(this.filialeForm.value.nom == ''){
      this.filialeForm.value.nom = fil.nom; 
    }

    if(this.filialeForm.value.pays == ''){
      this.filialeForm.value.pays = fil.pays; 
    }

    if(this.filialeForm.value.telephone == ''){
      this.filialeForm.value.telephone = fil.phone; 
    }
    console.log(this.filialeForm.value);
    let result = {
      bic : this.filialeForm.value.bic,
      fax : this.filialeForm.value.fax,
      nom : this.filialeForm.value.nom,
      phone : this.filialeForm.value.telephone,
      site: this.filialeForm.value.site_web,
      pays: this.filialeForm.value.pays

    }

    let nig =JSON.stringify(result);
    console.log(nig);


    axios.put(URL.API_URL + '/filiale/'+'updatefiliale/'+fil.id,nig,{
      headers : {
        'Authorization' : 'Bearer '  + this.userInfo.jwt,
        'Content-Type': 'application/json'

       } 
    }).then((res)=>{
      console.log(res.data);
       this.messageSuccess= res.data;
      this.update = true;
        this.loader = false;
        setTimeout(() => {
          window.location.reload()
        }, 1500);
    }).catch((error)=>{
      console.log(error);
      this.update = false;
      this.loader = false;
    })
  }
}
