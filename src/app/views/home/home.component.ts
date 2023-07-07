import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'bootstrap-table';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/Classes/base-url';
import { error } from 'jquery';
import { PersonnelService } from 'src/app/Services/personnel.service';
import axios from 'axios';
import { AssistService } from 'src/app/Services/assist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  ShowNavbar=false;
  employees: any
  
  tableOptions: any;
  deleted = false;
  actionDelete = false;
  searchText!: string;
  filteredData: any[] = [];
  messageSuccess! : String;
  update=false;
  create=false;
  loader=false;
  listville: any;
  currentPage = 1;
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileImageUrl!: string;
  selectedImage: any;
  personnelForm! : FormGroup



  

  constructor(private assistService :AssistService, private http : HttpClient, private personnel : PersonnelService){
  
    this.personnelForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      cisco: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      affectation: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      fonction : new FormControl('')

    });
  }
  ngOnInit() {
    this.getListVille();
    this.listpersonnel();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };

    reader.readAsDataURL(file);
    console.log(this.selectedImage)
  }

  onSubmit(personnel:any) {
     
    let pers = personnel;

    if(this.personnelForm.value.nom == ''){
      this.personnelForm.value.nom = pers.nom; 
    }
    if(this.personnelForm.value.prenom == ''){
      this.personnelForm.value.prenom = pers.prenom; 
    }
    if(this.personnelForm.value.ville == ''){
      this.personnelForm.value.ville = pers.ville; 
    }
    if(this.personnelForm.value.email == ''){
      this.personnelForm.value.email = pers.email; 
    }
    if(this.personnelForm.value.telephone == ''){
      this.personnelForm.value.telephone = pers.portable; 
    }
    if(this.personnelForm.value.cisco == ''){
      this.personnelForm.value.cisco = pers.cisco; 
    }
    if(this.personnelForm.value.affectation == ''){
      this.personnelForm.value.affectation = pers.affectation; 
    }
    if(this.personnelForm.value.fonction == ''){
      this.personnelForm.value.fonction = pers.fonction; 
    }
    if(this.personnelForm.value.photo ==''){
      this.personnelForm.value.photo = this.selectedImage; 
    }
    if(this.personnelForm.value.photo ==null){
      this.personnelForm.value.photo = pers.photo; 
    }
   
    console.log(this.personnelForm.value)

    let result={
      affectation :this.personnelForm.value.affectation,
      cisco : this.personnelForm.value.cisco,
      email : this.personnelForm.value.email,
      fonction : this.personnelForm.value.fonction,
      nom : this.personnelForm.value.nom,
      photo : this.personnelForm.value.photo,
      portable: this.personnelForm.value.telephone,
      prenom: this.personnelForm.value.prenom,
      ville : this.personnelForm.value.ville

    }
    console.log(result);

    let nig =JSON.stringify(result);
    axios.put(URL.API_URL + '/personnel' + '/updatepersonnel/'+pers.id_personnel,nig,{
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

  listpersonnel(){
   this.personnel.getpersonnel().subscribe(res=>{
    this.employees= res;
    console.log(res)
   })
  }

  getListVille(){
    this.assistService.getListVille().subscribe((res)=>{
      this.listville=res;
    })
  }


  }








































