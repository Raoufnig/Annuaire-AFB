import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { URL } from 'src/app/Classes/base-url';
import { AssistService } from 'src/app/Services/assist.service';
import { BureauService } from 'src/app/Services/bureau.service';

@Component({
  selector: 'app-bureaux',
  templateUrl: './bureaux.component.html',
  styleUrls: ['./bureaux.component.scss']
})
export class BureauxComponent implements OnInit {

  ShowNavbar=false;
  deleted = false;
  pageload = true;
  searchText!: string;
  filtercat!: any;
  messageburess! : String;
  listbureau:any;
  update=false;
  create=false;
  actionDelete=false;
  loader=false;
  errorCode=false;
  listPays:any;
  listregion:any;
  download=false;
  currentPage = 1;
  statusUser=false;
  statut:any;
  userInfo: any;
  storeData: any;

  bureauForm! : FormGroup

  constructor(private fb :FormBuilder ,private assistService :AssistService, private bureauService : BureauService ){
    this.bureauForm= new FormGroup({
      nom: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      email_pro: new FormControl('', [Validators.required, Validators.email]),
      chef: new FormControl('', Validators.required),
      fax : new FormControl('')
  
    })
  }

  ngOnInit() {
    this.ListBureau();
    this.getListPays();
    this.storeData = localStorage.getItem("UserInfo")
    this.userInfo = JSON.parse(this.storeData);
    this.statusUser=this.userInfo.userDetails.enabled;
    this.statut =this.userInfo.group;
  }

  ListBureau(){
    this.bureauService.getListBureau().then((res)=>{
      this.listbureau=res.data;
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
    console.log(this.bureauForm.value);

    if (!this.bureauForm.valid) {
      alert('Bien vouloir remplir tous les champs du formulaire');
      
    } else {
      let result = {
       
        chef : this.bureauForm.value.chef,
        fax:this.bureauForm.value.fax,
        mail_pro : this.bureauForm.value.email_pro,
        nom : this.bureauForm.value.nom,
        pays : this.bureauForm.value.pays,
        
      };
  
      let nig =JSON.stringify(result);
  
      axios.post(URL.API_URL + '/bureau' + '/addbureau',nig,{
        headers : {
          'Authorization' : 'Bearer '  + this.userInfo.jwt,
         'Content-Type': 'application/json'
  
        } }).then((res)=>{
         console.log(res.data);
         this.messageburess= res.data;
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
     pays: this.bureauForm.value.pays
    }
    console.log(result);
    this.filtercat = this.listbureau.filter((mot: any) => mot.pays.toLowerCase().includes( this.bureauForm.value.pays.toLowerCase()));

}

  searchByName(){
    this.filtercat = this.listbureau.filter((mot: any) => Object.values(mot).some(value=> typeof value === 'string' && value.toLowerCase().includes(this.searchText.toLowerCase())));
  }

  onUpdate(_bureau : any) {
    let bur = _bureau;
    console.log(bur);
   
    if(this.bureauForm.value.nom == ''){
      this.bureauForm.value.nom = bur.nom; 
    }
    if(this.bureauForm.value.chef == ''){
      this.bureauForm.value.chef = bur.chef; 
    }
    if(this.bureauForm.value.email_pro == ''){
      this.bureauForm.value.email_pro = bur.mail_pro; 
    }
    if(this.bureauForm.value.pays == ''){
      this.bureauForm.value.pays = bur.pays; 
    }
    if(this.bureauForm.value.fax == ''){
      this.bureauForm.value.fax = bur.fax; 
    }

    
    console.log(this.bureauForm.value);
    let result = {
       
      chef : this.bureauForm.value.chef,
      fax:this.bureauForm.value.fax,
      mail_pro : this.bureauForm.value.email_pro,
      nom : this.bureauForm.value.nom,
      pays : this.bureauForm.value.pays,
      
    };

    let nig =JSON.stringify(result);
    console.log(nig);


    axios.put(URL.API_URL + '/bureau' + '/updatebureau/' + bur.id,nig,{
      headers : {
        'Authorization' : 'Bearer '  + this.userInfo.jwt,
        'Content-Type': 'application/json'

       } 
    }).then((res)=>{
      console.log(res.data);
       this.messageburess= res.data;
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


  deletebureau(id : any){
    this.actionDelete = true;
    this.bureauService.deleteBureau(id).then((res)=>{
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    })
  }

}
