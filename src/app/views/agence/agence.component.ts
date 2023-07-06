import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  actionDelete=false;
  currentPage = 1;
  agenceForm! : FormGroup


  constructor(private agenceService : AgenceService, private assistService : AssistService, private http : HttpClient, private fb:FormBuilder){
    this.agenceForm = new FormGroup({
      name: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required), 
      adresse: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required),
      ville1 : new FormControl('')

  });

  }
  ngOnInit() {
    this.getList();
    this.getListVille();
    this.idville=3
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

    const nig1 = JSON.stringify(this.agenceForm.value.ville1)


    console.log(this.agenceForm.value.ville1)

    console.log(nig1)
    let result = {
      adresse: this.agenceForm.value.adresse,
      fax: this.agenceForm.value.fax,
      manager: this.agenceForm.value.manager,
      nom:this.agenceForm.value.name,
      telephone: this.agenceForm.value.telephone,
      ville : nig1
    }

    const nig = JSON.stringify(result)

    console.log(nig);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // const formData = new FormData();
    // formData.append('adresse', this.agenceForm.get('adresse')!.value);
    // formData.append('fax', this.agenceForm.get('fax')!.value);
    // formData.append('manager', this.agenceForm.get('manager')!.value);
    // formData.append('nom', this.agenceForm.get('name')!.value);
    // formData.append('telephone', this.agenceForm.get('telephone')!.value);
    // formData.append('ville1', this.agenceForm.get('ville1')!.value);
    // formData.append('ville_id', this.idville);
    // formData.append('direction_id', this.id);
   
    this.http.post(URL.API_URL + '/agence' + '/addagence', nig,{ headers }).subscribe((res)=>{

    });
    
    window.location.reload;
   
    //console.log(this.agenceForm.value);
    
  }
  
 
}
