import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { URL } from 'src/app/Classes/base-url';
import { AssistService } from 'src/app/Services/assist.service';
import { ConfrereService } from 'src/app/Services/confrere.service';

@Component({
  selector: 'app-confrere',
  templateUrl: './confrere.component.html',
  styleUrls: ['./confrere.component.scss']
})
export class ConfrereComponent implements OnInit {
  ShowNavbar=false;
  ConfrereList: any;
  listPays:any;
  searchText!: string;
  filtrecat: any;
  actionDelete= false;
  currentPage = 1;
  confrereForm! : FormGroup

  constructor(private confrereService : ConfrereService, private assistService:AssistService, private http : HttpClient){
    this.confrereForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      bic: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      cssystac: new FormControl('', Validators.required),
      pays1 : new FormControl('')

    });
  }
  ngOnInit() {
   this.getListPays();
   this.getListConfrere();
  }

  getListPays(){
    this.assistService.getListPays().subscribe((res)=>{
      this.listPays= res;
      console.log(this.listPays)
    })
  }

  getListConfrere(){
    this.confrereService.getConfrere().subscribe((res)=>{
      this.ConfrereList=res;
      this.filtrecat=res;
    })
  }

  searchByName(){
    this.filtrecat = this.ConfrereList.filter((mot: any) => mot.nom.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  searchByPays(paysnom:any){
    this.filtrecat = this.ConfrereList.filter((mot: any) => mot.pays.toLowerCase().includes(paysnom.toLowerCase()));
  }

  onSubmit2(){
       let result = {
        pays: this.confrereForm.value.pays1
       }
       console.log(result);
       this.filtrecat = this.ConfrereList.filter((mot: any) => mot.pays.toLowerCase().includes( this.confrereForm.value.pays1.toLowerCase()));

  }
  

  onSubmit() {
    console.log(this.confrereForm.value);
    let result ={
      adresse : this.confrereForm.value.adresse,
      bic : this.confrereForm.value.bic,
      contact_sygma_systac: this.confrereForm.value.cssystac,
      fax:this.confrereForm.value.fax,
      nom : this.confrereForm.value.nom,
      pays: this.confrereForm.value.pays,
      phone : this.confrereForm.value.telephone
    };

    let nig =JSON.stringify(result);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post(URL.API_URL + '/confrere' + '/addconfrere', nig,{ headers }).subscribe((res)=>{
      console.log(res);
      window.location.reload;

    });
    
    window.location.reload;
  }

  deleteConfrere(id: any){
    this.actionDelete = true;
    this.confrereService.deleteConfrere(id).subscribe((res)=>{
        
      this.actionDelete = false;
      //window.location.reload;
    
    }, (error)=>{
      console.log(error);
    });
  }


}
