import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss']
})
export class AgenceComponent {
  ShowNavbar=false;
  agenceForm! : FormGroup


  constructor(){
    this.agenceForm = new FormGroup({
      name: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required), 
      adresse: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      ville1: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required)


  });
  }
  onSubmit() {
    console.log(this.agenceForm.value);
  }
 
}
