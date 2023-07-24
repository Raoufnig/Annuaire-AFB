import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { error } from 'jquery';
import { URL } from 'src/app/Classes/base-url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword: boolean = false;
  loginForm: FormGroup;
  log = false;
  loader = false;
  error = false;
  errormessage!: string;


  constructor(private router : Router){
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.required),
    });
  }

  async onSubmit(){
    if (this.loginForm.invalid) {
      console.error("Champs du formulaire invalides.");
      return;
    }
    this.log = true;
    this.loader = true;
    
    let result ={
      username : this.loginForm.value.email,
      password : this.loginForm.value.password
    }
    const nig = JSON.stringify(result)
    await axios.post(URL.API_URL + '/auth/authenticate', nig,{
      headers:{
        "Content-Type" : 'application/json'
      }

    }).then((res)=>{

      localStorage.setItem('UserInfo', JSON.stringify(res.data));
      console.log("UserInfo : ", localStorage.getItem('UserInfo'));
      this.router.navigate(['/'])

    }).catch((error)=>{
      this.log = false;
      this.loader = false;
      this.error = true;
      this.errormessage = error.response.data.message ?? error.response.data.error

    })
  }


}
