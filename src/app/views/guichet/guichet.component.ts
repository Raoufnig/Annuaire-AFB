import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { URL } from 'src/app/Classes/base-url';
import { AssistService } from 'src/app/Services/assist.service';
import { GuichetService } from 'src/app/Services/guichet.service';

@Component({
  selector: 'app-guichet',
  templateUrl: './guichet.component.html',
  styleUrls: ['./guichet.component.scss']
})
export class GuichetComponent implements OnInit {
  ShowNavbar=false;
  deleted = false;
  pageload = true;
  searchText!: string;
  filtercat!: any;
  messageSuccess! : String;
  listguichet:any;
  update=false;
  create=false;
  actionDelete=false;
  loader=false;
  errorCode=false;
  imgerror=false
  listPays:any;
  download=false;
  currentPage = 1;
  guichetForm! : FormGroup

  constructor(private fb :FormBuilder ,private assistService :AssistService, private guichetService : GuichetService){
    this.guichetForm= new FormGroup({
      nom: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      email_pro: new FormControl('', [Validators.required, Validators.email]),
      chef: new FormControl('', Validators.required),
      id_agence: new FormControl('', Validators.required),
      id_succursale: new FormControl('', Validators.required),
      agence: new FormControl('', Validators.required),
      succursale: new FormControl('', Validators.required),

    })
  }

  ngOnInit() {
   this.ListGuichet();
   this.getListPays();
  }

  ListGuichet(){
    this.guichetService.getListGuichet().then((res)=>{
      this.listguichet=res.data;
      this.filtercat=res.data;
    })
  }
  getListPays(){
    this.assistService.getListPays().subscribe((res)=>{
      this.listPays= res;
      console.log(this.listPays)
    })
  }

  onSubmit() {
    console.log(this.guichetForm.value);

    if (!this.guichetForm.valid) {
      alert('Bien vouloir remplir tous les champs du formulaire');
      
    } else {
      let result = {
        chef : this.guichetForm.value.chef,
        id_agence : this.guichetForm.value.id_agence,
        id_surccusale: this.guichetForm.value.id_succursale,
        mail_pro : this.guichetForm.value.email_pro,
        nom : this.guichetForm.value.nom,
        ville : this.guichetForm.value.telephone,
        fax:this.guichetForm.value.fax,
      };
  
      let nig =JSON.stringify(result);
  
      axios.post(URL.API_URL + '/guichet' + '/addguichet',nig,{
        headers : {
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
  
  }
  onSubmit2(){
    let result = {
     id_agence: this.guichetForm.value.agence
    }
    console.log(result);
    this.filtercat = this.listguichet.filter((mot: any) => mot.id_agence.toLowerCase().includes( this.guichetForm.value.agence.toLowerCase()));

}
 
searchByName(){
  this.filtercat = this.listguichet.filter((mot: any) => Object.values(mot).some(value=> typeof value === 'string' && value.toLowerCase().includes(this.searchText.toLowerCase())));
}
  onUpdate(guichet : any) {
    let guich = guichet;
    console.log(guich);
   
    if(this.guichetForm.value.nom == ''){
      this.guichetForm.value.nom = guich.nom; 
    }
    if(this.guichetForm.value.chef == ''){
      this.guichetForm.value.chef = guich.chef; 
    }
    if(this.guichetForm.value.email_pro == ''){
      this.guichetForm.value.email_pro = guich.mail_pro; 
    }
    if(this.guichetForm.value.ville == ''){
      this.guichetForm.value.ville = guich.ville; 
    }
    if(this.guichetForm.value.fax == ''){
      this.guichetForm.value.fax = guich.fax; 
    }

    if(this.guichetForm.value.id_agence == ''){
      this.guichetForm.value.id_agence = guich.id_agence; 
    }
    if(this.guichetForm.value.id_succursale == ''){
      this.guichetForm.value.id_succursale = guich.id_succursale; 
    }
    
    
    console.log(this.guichetForm.value);
    let result = {
      chef : this.guichetForm.value.chef,
      id_agence : this.guichetForm.value.id_agence,
      id_surccusale: this.guichetForm.value.id_succursale,
      mail_pro : this.guichetForm.value.email_pro,
      nom : this.guichetForm.value.nom,
      ville : this.guichetForm.value.telephone,
      fax:this.guichetForm.value.fax,
    };

    let nig =JSON.stringify(result);
    console.log(nig);


    axios.put(URL.API_URL + '/guichet/' +'updateguichet/'+guich.id,nig,{
      headers : {
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


  deleteGuichet(id : any){
    this.actionDelete = true;
    this.guichetService.deleteGuichet(id).then((res)=>{
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    })
  }

}
