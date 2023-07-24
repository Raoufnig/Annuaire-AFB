import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { error } from 'jquery';
import { URL } from 'src/app/Classes/base-url';
import { AgenceService } from 'src/app/Services/agence.service';
import { AssistService } from 'src/app/Services/assist.service';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss']
})
export class AgenceComponent implements OnInit {
  ShowNavbar=false;
  agenceList : any;
  filtrecat: any;
  searchText!: string;
  id : any;
  idville:any;
  listville:any;
  messageSuccess! : String;
  update=false;
  create=false;
  loader=false;
  actionDelete=false;
  currentPage = 1;
  statusUser=false;
  statut:any;
  userInfo: any;
  storeData: any;
  agenceForm! : FormGroup


  constructor(private agenceService : AgenceService, private assistService : AssistService, private http : HttpClient, private fb:FormBuilder){
    this.agenceForm = new FormGroup({
      name: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required), 
      adresse: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      ville : new FormControl('')

  });

  }
  ngOnInit() {
    this.getList();
    this.getListVille();
    this.storeData = localStorage.getItem("UserInfo")
    this.userInfo = JSON.parse(this.storeData);
    this.statusUser=this.userInfo.userDetails.enabled;
    this.statut =this.userInfo.group;
  }

  getList(){
      this.agenceService.getAgence().subscribe((res)=>{
        this.agenceList= res;
        this.filtrecat=res;
        console.log(res);
      })
  }

  getListVille(){
    this.assistService.getListVille().subscribe((res)=>{
      this.listville= res;

      console.log(this.listville);
    })
  }


  searchByName(){
    this.filtrecat = this.agenceList.filter((mot: any) => mot.nom.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  
  onSubmit() {
    
    let result = {
      adresse: this.agenceForm.value.adresse,
      fax: this.agenceForm.value.fax,
      manager: this.agenceForm.value.manager,
      nom:this.agenceForm.value.name,
      telephone: this.agenceForm.value.telephone,
      ville : this.agenceForm.value.ville,
    }

    const nig = JSON.stringify(result)
   
    axios.post(URL.API_URL + '/agence' + '/addagence', nig,{ 
      headers: {
        'Authorization' : 'Bearer '  + this.userInfo.jwt,
        "Content-Type" : 'application/json'
      } }).then((res)=>{
        this.messageSuccess= res.data;
         this.create = true;
         this.loader = false;
         setTimeout(() => {
           window.location.reload()
         }, 1500);

    }).catch((error)=>{
      console.log(error.error);
      this.create = false;
       this.loader = false;
    });
    
    
  }

  onUpdate(agence : any) {
    let agen = agence;
    console.log(agen);
   
    if(this.agenceForm.value.adresse == ''){
      this.agenceForm.value.adresse = agen.adresse; 
    }
   
    if(this.agenceForm.value.manager == ''){
      this.agenceForm.value.manager = agen.manager; 
    }
    if(this.agenceForm.value.fax == ''){
      this.agenceForm.value.fax = agen.fax; 
    }
    if(this.agenceForm.value.name == ''){
      this.agenceForm.value.name = agen.name; 
    }

    if(this.agenceForm.value.ville == ''){
      this.agenceForm.value.ville = agen.ville; 
    }
    if(this.agenceForm.value.region == ''){
      this.agenceForm.value.region = agen.Id_region; 
    }

    if(this.agenceForm.value.telephone == ''){
      this.agenceForm.value.telephone = agen.telephone; 
    }
    console.log(this.agenceForm.value);
    let result ={
      adresse : this.agenceForm.value.adresse,
      Id_region : this.agenceForm.value.region,
      manager: this.agenceForm.value.manager,
      fax:this.agenceForm.value.fax,
      nom : this.agenceForm.value.nom,
      ville: this.agenceForm.value.ville,
      telephone : this.agenceForm.value.telephone
    };

    let nig =JSON.stringify(result);
    console.log(nig);


    axios.put(URL.API_URL + '/agence/'+'updateagence/'+agen.id,nig,{
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
