import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confrere',
  templateUrl: './confrere.component.html',
  styleUrls: ['./confrere.component.scss']
})
export class ConfrereComponent {
  ShowNavbar=false;
  confrereForm! : FormGroup

  constructor(){
    this.confrereForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      bic: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      cssystac: new FormControl('', Validators.required)

    });
  }

  onSubmit() {
    console.log(this.confrereForm.value);
  }

}
