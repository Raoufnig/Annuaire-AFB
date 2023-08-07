import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
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
  searchText!: string;
  filtrecat: any;
  isOpen = false;
  actionDelete = false;
  messageSuccess!:string
  loader=false;
  create=false;
  update=false;
  deleted = false;
  currentPage = 1;
  statusUser=false;
  statut:any;
  userInfo: any;
  storeData: any;
  correspondantForm! : FormGroup


  constructor(private correspondantService: CorrespondantService, private http: HttpClient, private assistService : AssistService){
    this.correspondantForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      bic: new FormControl('', Validators.required),
      num_compte: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      site_web: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      pays1 : new FormControl('')

    });
  }

  ngOnInit() {
    this.getListPays();
    this.getListCorrespondant();
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

//Fonction pour recuperer la liste des correspondants
  getListCorrespondant(){
    this.correspondantService.getCorrespondant().then((res)=>{
      this.listcorrespondant=res.data;
      this.filtrecat=res.data;
    })
  }
//

//Fonction de recherche en fonction de tous les attributs du correspondant 
  searchByName(){
    this.filtrecat = this.listcorrespondant.filter((mot: any) => mot.nom.toLowerCase().includes(this.searchText.toLowerCase()));
  }
//

//Fontion pour filtrer la recherche
onSubmit2(){
    let result = {
     pays: this.correspondantForm.value.pays1
    }
    console.log(result);
    this.filtrecat = this.listcorrespondant.filter((mot: any) => mot.pays.toLowerCase().includes( this.correspondantForm.value.pays1.toLowerCase()));

}

//Fonction pour creer un nouveau correspondant
  onSubmit() {
    console.log(this.correspondantForm.value);

    let result = {
      bic: this.correspondantForm.value.bic,
      fax : this.correspondantForm.value.fax,
      manager : this.correspondantForm.value.manager,
      nom: this.correspondantForm.value.nom,
      num_compte : this.correspondantForm.value.num_compte,
      pays: this.correspondantForm.value.pays,
      phone: this.correspondantForm.value.telephone,
      site: this.correspondantForm.value.site_web
      
    }

    const nig = JSON.stringify(result);
    axios.post(URL.API_URL + '/correspondant' + '/addcorrespondant',nig,{
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
//

//Fonction pour mettre à jour les infos d'un correspondant à l'aide de son id
  onUpdate(correspondant : any) {
    let corr = correspondant;
    console.log(corr);
   
    if(this.correspondantForm.value.manager == ''){
      this.correspondantForm.value.manager = corr.manager; 
    }
    if(this.correspondantForm.value.bic == ''){
      this.correspondantForm.value.bic = corr.bic; 
    }
    if(this.correspondantForm.value.site_web == ''){
      this.correspondantForm.value.site_web = corr.site; 
    }
    if(this.correspondantForm.value.fax == ''){
      this.correspondantForm.value.fax = corr.fax; 
    }
    if(this.correspondantForm.value.nom == ''){
      this.correspondantForm.value.nom = corr.nom; 
    }

    if(this.correspondantForm.value.pays == ''){
      this.correspondantForm.value.pays = corr.pays; 
    }

    if(this.correspondantForm.value.telephone == ''){
      this.correspondantForm.value.telephone = corr.phone; 
    }
    console.log(this.correspondantForm.value);
    let result = {
      fax : this.correspondantForm.value.fax,
      manager : this.correspondantForm.value.manager,
      nom: this.correspondantForm.value.nom,
      pays: this.correspondantForm.value.pays,
      phone: this.correspondantForm.value.telephone,
      site: this.correspondantForm.value.site_web
      
    }

    let nig =JSON.stringify(result);
    console.log(nig);


    axios.put(URL.API_URL + '/correspondant/'+'updatecorrespondant/'+corr.id,nig,{
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
//

//Fonction qui permet de supprimer un correspondant à l'aide de son id
  deleteCorrespondant(id: any){
    this.actionDelete = true;
    this.correspondantService.deleteCorrespondant(id, this.userInfo.jwt).then((res)=>{
        
      this.actionDelete = false;
      //window.location.reload;
    
    }).catch((error)=>{
      console.log(error.error.text);
      //window.location.reload();
      this.deleted = true
    });
    this.deleted = true
  }
//

//Fonction pour recharger la page
  reloadPage(){
    window.location.reload();
  }
//

}
