import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'bootstrap-table';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/Classes/base-url';
import { error } from 'jquery';
import { PersonnelService } from 'src/app/Services/personnel.service';
import axios from 'axios';
import { AssistService } from 'src/app/Services/assist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  ShowNavbar=false;
  employees: any
  
  
  deleted = false;
  pageload = true;
  searchText!: string;
  filtercat!: any;
  adresse:any;
  numero:any;
  messageSuccess! : String;
  update=false;
  create=false;
  loader=false;
  errorCode=false;
  imgerror=false;
  download=false;
  statusUser=false;
  statut:any;
  phoneNumbers: any[]=[''];
  listville: any[]=[];
  list: any;
  userInfo: any;
  storeData: any;
  listUnite: any[]=[];
  listFonction: any[]=[];
  currentPage = 1;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('popoverTrigger') popoverTrigger!: ElementRef;
  profileImageUrl!: string;
  selectedImage: any;
  
  emails: any[]=[''];
  personnelForm! : FormGroup



  

  constructor(private router :Router,private fb :FormBuilder ,private assistService :AssistService, private http : HttpClient, private personnel : PersonnelService){
  
    this.personnelForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      extension: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.required]),
      unite: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      fonction : new FormControl(''),
      addphone: this.fb.array([]),
      addemail: this.fb.array([],[Validators.required, Validators.email]),

    });
  }

  

  ngOnInit() {
    this.getListVille();
    this.listpersonnel();
   
    this.storeData = localStorage.getItem("UserInfo")
    this.userInfo = JSON.parse(this.storeData);
    this.statusUser=this.userInfo.userDetails.enabled;
    this.statut =this.userInfo.group;
    
    //console.log("userInfo", this.userInfo);
  
  }

  get addPhone() {
    return this.personnelForm.get('addphone') as FormArray;
  }

  get addEmail() {
    return this.personnelForm.get('addemail') as FormArray;
  }
  addPhoneNumbers() {
    if(this.addPhone.length<5){
      this.addPhone.push(this.fb.control(''));
    }

    console.log(this.addPhone.value)
    
  }
  addEmails() {
    if(this.addEmail.length<5){
      this.addEmail.push(this.fb.control(''));
    }
   
    console.log(this.addEmail.value)
  }

  

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if(file.size>1000000){
      this.imgerror=true;
    }
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
    if(this.personnelForm.value.extension == ''){
      this.personnelForm.value.extension = pers.extension; 
    }
    if(this.personnelForm.value.unite == '' ){
      this.personnelForm.value.unite = pers.unite; 
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
      email : this.personnelForm.value.email,
      fonction : this.personnelForm.value.fonction,
      nom : this.personnelForm.value.nom,
      photo : this.personnelForm.value.photo,
      portable: this.personnelForm.value.telephone,
      prenom: this.personnelForm.value.prenom,
      ville : this.personnelForm.value.ville,
      extension : this.personnelForm.value.extension,
      unite :this.personnelForm.value.unite
    }

    console.log(result);

    let nig =JSON.stringify(result);
    axios.put(URL.API_URL + '/personnel' + '/updatepersonnel/'+pers.id_personnel,nig,{
      headers : {
        'Authorization' : 'Bearer '  + this.userInfo.jwt, 
       'Content-Type': 'application/json'

      } }).then((res)=>{
       console.log(res.data);
       this.messageSuccess= res.data;
       this.create = true;
       this.loader = false;
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1500);

    }).catch((error)=>{
     this.create = false;
     this.loader = false;
    // console.log(error);
      
   })
   
   for(let i of this.addEmail.value){
    if(i != ''){
      let result1={
        id_source: pers.id_personnel,
        mail: i
      }
      console.log(result1);

    let nig1 =JSON.stringify(result1);
      axios.post(URL.API_URL + '/adresse' + '/addadresse/',nig1,{
        headers : {
         'Authorization' : 'Bearer '  + this.userInfo.token, 
         'Content-Type': 'application/json'
  
        }}).then((res)=>{
          console.log(res.data)
        }).catch((error)=>{
          console.log(error.error);
        })
    }

   }

   for(let i of this.addPhone.value){
    if(i != ''){
      let res={
        id_source: pers.id_personnel,
        tel: i
      }
      console.log(res);

    let rnig =JSON.stringify(res);
      axios.post(URL.API_URL + '/telephone' + '/addnumero/',rnig,{
        headers : {
         'Content-Type': 'application/json'
  
        }}).then((response)=>{
          console.log(response.data)
        }).catch((error)=>{
          console.log(error.error);
        })
    }

   }
   
 
  }

  onSubmit2(){
    
    axios.get(URL.API_URL + '/personnel' + '/search', {
      params: {
        ville : this.personnelForm.value.ville,
        unite : this.personnelForm.value.unite,
        fonction: this.personnelForm.value.fonction
      },
    }).then((res)=>{
       this.filtercat=res.data;
       this.filtercat.sort((a:any,b:any)=>(a.nom>b.nom ? 1 : -1));
       console.log(this.filtercat);
       this.download=true;

    }).catch((error)=>{

    })

}

downloadPersonnelExcel() {
  axios.get(URL.API_URL + '/personnel'+'/download', { responseType: 'blob',
  params: {
    ville : this.personnelForm.value.ville,
    unite : this.personnelForm.value.unite,
    fonction: this.personnelForm.value.fonction
   // request : this.request
  } })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'personnel.xlsx');
      document.body.appendChild(link);
      link.click();
      window.location.reload();
    });
}

listpersonnel(){

    

   this.personnel.getpersonnel().then((res)=>{
    this.employees= res.data;
  
    this.filtercat=res.data;
    this.filtercat.sort((a:any,b:any)=>(a.nom>b.nom ? 1 : -1));
    for(let i of this.employees){

      if(!this.listUnite.includes(i.unite)){
        this.listUnite.push(i.unite);
      }
      
      if(!this.listFonction.includes(i.fonction)){
        this.listFonction.push(i.fonction);
      }
      if(!this.listville.includes(i.ville)){
        this.listville.push(i.ville);
      }

    
      
    }
    this.pageload=false;
    console.log(this.listUnite);
    console.log(this.listFonction);
    console.log(res);

   }).catch((error)=>{
    console.log(error);
    if (error.code = "ERR_NETWORK"){
      this.errorCode=true;
    }

    
   })

   this.assistService.getListAdresse().then((res)=>{
      this.adresse=res.data;
      console.log(this.adresse)
   })

   this.assistService.getListNumero().then((res)=>{
     this.numero=res.data;
     console.log(this.numero)
   })
}

// addphoneNumber(firstnumber:any){
//   this.phoneNumbers[1]= firstnumber;
//   if(this.phoneNumbers.length<5){
//      this.phoneNumbers.push(this.personnelForm.value.telephone);
    
    
//   }
    
  
//     console.log(this.phoneNumbers);
  
// }

// addEmails(firstmail:any){
//   this.emails[1]=firstmail;
//   if(this.emails.length<5){
//     this.emails.push(this.personnelForm.value.email);
//   }
//   console.log(this.emails);
  
// }




searchByName(){
  this.filtercat = this.employees.filter((mot: any) => Object.values(mot).some(value=> typeof value === 'string' && value.toLowerCase().includes(this.searchText.toLowerCase())));
}

getListVille(){
    this.assistService.getListVille().subscribe((res)=>{
      this.list=res;
      for (let i of this.list){
         this.listville.push(i.nom)
      }
                                                                                                                        
      console.log(this.listville)
    })
}



}








































