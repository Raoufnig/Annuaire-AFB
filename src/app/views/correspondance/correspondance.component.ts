import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-correspondance',
  templateUrl: './correspondance.component.html',
  styleUrls: ['./correspondance.component.scss']
})
export class CorrespondanceComponent {
  ShowNavbar=false;
  correspondantForm! : FormGroup


  constructor(){
    this.correspondantForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      site_web: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required)

    });
  }

  onSubmit() {
    console.log(this.correspondantForm.value);
  }
}
