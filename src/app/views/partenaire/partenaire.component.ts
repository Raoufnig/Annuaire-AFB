import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.component.html',
  styleUrls: ['./partenaire.component.scss']
})
export class PartenaireComponent {
  ShowNavbar=false;
  partenaireForm! : FormGroup

  constructor(){
    this.partenaireForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      dom_activite: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required)

    });
  }

  onSubmit() {
    console.log(this.partenaireForm.value);
  }
}
