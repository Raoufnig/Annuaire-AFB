import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filiale',
  templateUrl: './filiale.component.html',
  styleUrls: ['./filiale.component.scss']
})
export class FilialeComponent {
  ShowNavbar=false;
  filialeForm!: FormGroup;

  constructor(){
    this.filialeForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      bic: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      site_web: new FormControl('', Validators.required)

    });
  }

  onSubmit() {
    console.log(this.filialeForm.value);
  }
}
