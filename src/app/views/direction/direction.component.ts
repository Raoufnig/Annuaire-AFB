import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { URL } from 'src/app/Classes/base-url';
import { AssistService } from 'src/app/Services/assist.service';
import { DirectionService } from 'src/app/Services/direction.service';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent {

  ShowNavbar=false;
  deleted = false;
  pageload = true;
  searchText!: string;
  filtrecat!: any;
  messageSuccess! : String;
  listdirection:any;
  update=false;
  create=false;
  actionDelete=false;
  loader=false;
  errorCode=false;
  imgerror=false
  listville:any;
  download=false;
  currentPage = 1;
  statusUser=false;
  statut:any;
  userInfo: any;
  storeData: any;
  directionForm: FormGroup

  constructor(private fb :FormBuilder ,private assistService :AssistService, private directionService : DirectionService ){
    this.directionForm= new FormGroup({
      nom: new FormControl('', Validators.required),
      email_pro: new FormControl('', [Validators.required, Validators.email]),
      chef: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),

    })
  }

  ngOnInit() {
   this.ListDirection();
   this.storeData = localStorage.getItem("UserInfo")
    this.userInfo = JSON.parse(this.storeData);
    this.statusUser=this.userInfo.userDetails.enabled;
    this.statut =this.userInfo.group;
  }

//Fonction pour recuperer la liste des directions
  ListDirection(){
    this.directionService.getListDirection().then((res)=>{
      this.listdirection=res.data;
      this.filtrecat=res.data;
    })
  }
//
 

//Fonction pour creer une nouvelle direction
  onSubmit() {
    console.log(this.directionForm.value);

   
      let result = {
        nom : this.directionForm.value.nom,
        adresse : this.directionForm.value.email_pro,
        directeur : this.directionForm.value.chef,
        fax:this.directionForm.value.fax,
        telephone:this.directionForm.value.telephone,
        
      };
  
      let nig =JSON.stringify(result);
  
      axios.post(URL.API_URL + '/direction' + '/addDirection',nig,{
        headers : {
         'Authorization' : 'Bearer ' + this.userInfo.jwt,
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

//Fonction de recherche en fonction de tous les attributs de la direction 
searchByName(){
  this.filtrecat = this.listdirection.filter((mot: any) => Object.values(mot).some(value=> typeof value === 'string' && value.toLowerCase().includes(this.searchText.toLowerCase())));
}
//


//Fonction pour mettre à jour les infos d'une direction à l'aide de son id

  onUpdate(direction : any) {
    let dir = direction;
    console.log(dir);
   
    if(this.directionForm.value.nom == ''){
      this.directionForm.value.nom = dir.nom; 
    }
    if(this.directionForm.value.chef == ''){
      this.directionForm.value.chef = dir.directeur; 
    }
    if(this.directionForm.value.email_pro == ''){
      this.directionForm.value.email_pro = dir.adresse; 
    }
    
    if(this.directionForm.value.fax == ''){
      this.directionForm.value.fax = dir.fax; 
    }

    if(this.directionForm.value.telephone == ''){
      this.directionForm.value.telephone = dir.telephone; 
    }
   
    
    
    console.log(this.directionForm.value);
    let result = {
      nom : this.directionForm.value.nom,
      adresse : this.directionForm.value.email_pro,
      directeur : this.directionForm.value.chef,
      fax:this.directionForm.value.fax,
      telephone:this.directionForm.value.telephone,
      
    };

    let nig =JSON.stringify(result);
    console.log(nig);


    axios.put(URL.API_URL + '/direction/' +'updatedirection/'+dir.id,nig,{
      headers : {
        'Authorization' : 'Bearer ' + this.userInfo.jwt,
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

//Fonction qui permet de supprimer une direction à l'aide de son id
  deleteDirection(id : any){
    this.actionDelete = true;
    this.directionService.deleteDirection(id, this.userInfo.jwt).then((res)=>{
      console.log(res);
      this.deleted=true;
    }).catch((error)=>{
      console.log(error);
    })
  }
//

//Fonction pour recharger la page
  reloadPage(){
    window.location.reload();
  }
//

}
