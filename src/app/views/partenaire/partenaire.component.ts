import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { URL } from 'src/app/Classes/base-url';
import { AssistService } from 'src/app/Services/assist.service';
import { PartenaireService } from 'src/app/Services/partenaire.service';

@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.component.html',
  styleUrls: ['./partenaire.component.scss']
})
export class PartenaireComponent implements OnInit {
  ShowNavbar=false;
  listpays: any;
  listpartenaire: any;
  searchText!: string;
  filtrecat: any;
  currentPage = 1;
  messageSuccess!: string;
  create=false;
  loader=false;
  update=false;
  actionDelete= false;
  partenaireForm! : FormGroup

  constructor(private assistService : AssistService, private http : HttpClient, private partenaireService : PartenaireService){
    this.partenaireForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      dom_activite: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required),
      pays1 : new FormControl('')

    });
  }
  ngOnInit() {
    this.getListPartenaire();
    this.getListPays();
  }

  getListPays(){
    this.assistService.getListPays().subscribe((res)=>{
      this.listpays= res;
    })
  }
  getListPartenaire(){
      this.partenaireService.getPartenaire().subscribe((res)=>{
        this.listpartenaire=res;
        this.filtrecat=res;
      })
  }
  searchByName(){
    this.filtrecat = this.listpartenaire.filter((mot: any) => mot.nom.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  searchByPays(paysnom:any){
    this.filtrecat = this.listpartenaire.filter((mot: any) => mot.pays.toLowerCase().includes(paysnom.toLowerCase()));
  }

  onSubmit2(){
    let result = {
     pays: this.partenaireForm.value.pays1
    }
    console.log(result);
    this.filtrecat = this.listpartenaire.filter((mot: any) => mot.pays.toLowerCase().includes( this.partenaireForm.value.pays1.toLowerCase()));

}


  deletePartenaire(id : any){
    this.partenaireService.deletePartenaire(id).subscribe((res)=>{

    }, (error)=>{
      console.log(error);
    })

  }

  onSubmit() {
    console.log(this.partenaireForm.value);

    let result = {
      adresse : this.partenaireForm.value.adresse,
      dom_acti : this.partenaireForm.value.dom_activite,
      fax: this.partenaireForm.value.fax,
      manager : this.partenaireForm.value.manager,
      nom : this.partenaireForm.value.nom,
      phone : this.partenaireForm.value.telephone,
      pays : this.partenaireForm.value.pays
    }

    const nig = JSON.stringify(result)

    axios.post(URL.API_URL + '/partenaire' + '/addpartenaire',nig,{
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
  onUpdate(partenaire : any) {
    let part = partenaire;
    console.log(part);
   
    if(this.partenaireForm.value.adresse == ''){
      this.partenaireForm.value.adresse = part.adresse; 
    }
    if(this.partenaireForm.value.manager == ''){
      this.partenaireForm.value.manager = part.manager; 
    }
    if(this.partenaireForm.value.cssystac == ''){
      this.partenaireForm.value.dom_activite = part.dom_acti; 
    }
    if(this.partenaireForm.value.fax == ''){
      this.partenaireForm.value.fax = part.fax; 
    }
    if(this.partenaireForm.value.nom == ''){
      this.partenaireForm.value.nom = part.nom; 
    }

    if(this.partenaireForm.value.pays == ''){
      this.partenaireForm.value.pays = part.pays; 
    }

    if(this.partenaireForm.value.telephone == ''){
      this.partenaireForm.value.telephone = part.phone; 
    }
    console.log(this.partenaireForm.value);
    let result = {
      adresse : this.partenaireForm.value.adresse,
      dom_acti : this.partenaireForm.value.dom_activite,
      fax: this.partenaireForm.value.fax,
      manager : this.partenaireForm.value.manager,
      nom : this.partenaireForm.value.nom,
      phone : this.partenaireForm.value.telephone,
      pays : this.partenaireForm.value.pays
    }

    let nig =JSON.stringify(result);
    console.log(nig);


    axios.put(URL.API_URL + '/partenaire/'+'updatepartenaire/'+part.id,nig,{
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
}
