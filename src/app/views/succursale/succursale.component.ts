import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { URL } from 'src/app/Classes/base-url';
import { AssistService } from 'src/app/Services/assist.service';
import { SuccursaleService } from 'src/app/Services/succursale.service';

@Component({
  selector: 'app-succursale',
  templateUrl: './succursale.component.html',
  styleUrls: ['./succursale.component.scss']
})
export class SuccursaleComponent implements OnInit {
 
  ShowNavbar=false;
  deleted = false;
  pageload = true;
  searchText!: string;
  filtercat!: any;
  messageSuccess! : String;
  listsuccursale:any;
  update=false;
  create=false;
  actionDelete=false;
  loader=false;
  errorCode=false;
  listPays:any;
  listregion:any;
  download=false;
  currentPage = 1;
  succursaleForm! : FormGroup


constructor(private fb :FormBuilder ,private assistService :AssistService, private succursale : SuccursaleService){

  this.succursaleForm= new FormGroup({
    nom: new FormControl('', Validators.required),
    ville: new FormControl('', Validators.required),
    email_pro: new FormControl('', [Validators.required, Validators.email]),
    chef: new FormControl('', Validators.required),
    id_region : new FormControl(''),
    fax : new FormControl('')

  })
  
}

  ngOnInit(): void {
    this.ListSuccursale();
    this.getListRegion();
    this.getListPays();
  }

  
  ListSuccursale(){
    this.succursale.getListSuccursale().then((res)=>{
      this.listsuccursale=res.data;
      this.filtercat=res.data;
    })
  }

  getListPays(){
    this.assistService.getListPays().subscribe((res)=>{
      this.listPays= res;
      console.log(this.listPays)
    })
  }
  getListRegion(){
    this.assistService.getListRegion().then((res)=>{
      this.listregion= res.data;
      console.log(this.listPays)
    })
  }

  onSubmit() {
    console.log(this.succursaleForm.value);

    if (!this.succursaleForm.valid) {
      alert('Bien vouloir remplir tous les champs du formulaire');
      
    } else {
      let result = {
       
        chef : this.succursaleForm.value.chef,
        id_region: this.succursaleForm.value.id_region,
        mail_pro : this.succursaleForm.value.email_pro,
        nom : this.succursaleForm.value.nom,
        ville : this.succursaleForm.value.telephone,
        fax:this.succursaleForm.value.fax,
      };
  
      let nig =JSON.stringify(result);
  
      axios.post(URL.API_URL + '/succursale' + '/addsuccursale',nig,{
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
     id_agence: this.succursaleForm.value.agence
    }
    console.log(result);
    this.filtercat = this.listsuccursale.filter((mot: any) => mot.id_region.toLowerCase().includes( this.succursaleForm.value.id_region.toLowerCase()));

}

  searchByName(){
    this.filtercat = this.listsuccursale.filter((mot: any) => Object.values(mot).some(value=> typeof value === 'string' && value.toLowerCase().includes(this.searchText.toLowerCase())));
  }

  onUpdate(_succursale : any) {
    let succ = _succursale;
    console.log(succ);
   
    if(this.succursaleForm.value.nom == ''){
      this.succursaleForm.value.nom = succ.nom; 
    }
    if(this.succursaleForm.value.chef == ''){
      this.succursaleForm.value.chef = succ.chef; 
    }
    if(this.succursaleForm.value.email_pro == ''){
      this.succursaleForm.value.email_pro = succ.mail_pro; 
    }
    if(this.succursaleForm.value.ville == ''){
      this.succursaleForm.value.ville = succ.ville; 
    }
    if(this.succursaleForm.value.fax == ''){
      this.succursaleForm.value.fax = succ.fax; 
    }

    if(this.succursaleForm.value.id_region == ''){
      this.succursaleForm.value.id_region = succ.id_region; 
    }
    
    
    
    
    console.log(this.succursaleForm.value);
    let result = {
       
      chef : this.succursaleForm.value.chef,
      id_region: this.succursaleForm.value.id_region,
      mail_pro : this.succursaleForm.value.email_pro,
      nom : this.succursaleForm.value.nom,
      ville : this.succursaleForm.value.telephone,
      fax:this.succursaleForm.value.fax,
    };

    let nig =JSON.stringify(result);
    console.log(nig);


    axios.put(URL.API_URL + '/succursale'+'/updatesuccursale/'+succ.id,nig,{
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

  deletesuccursale(id : any){
    this.actionDelete = true;
    this.succursale.deleteSuccursale(id).then((res)=>{
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    })
  }
}
