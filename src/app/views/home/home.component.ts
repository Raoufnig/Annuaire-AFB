import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'bootstrap-table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ShowNavbar=false;
  BearerToken = "";
  storeData: any;
  compagnyInfo: any;
  employees: Array<any> = [];
  subscription!: Subscription;
  tableOptions: any;
  deleted = false;
  actionDelete = false;
  searchText!: string;
  filteredData: any[] = [];
  currentPage = 1;
  loaderpage = true;
  errormessage: any;
  errorload = false;
  docData: any;
  docInfo: any;
  modify: Boolean = false;
  create = false;
  loader = false;
  createFile = false;
  enregistreur = "Enregistrer";
  contentError = false;
  contentErrorPrint = false;
  CreateUser: FormGroup;
  errorPrint: any;
  selectedFile: File | undefined;

  constructor(private formBuilder: FormBuilder){
    this.CreateUser = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      affectation: ['', Validators.required],
      fonction: ['', Validators.required],
      ville: ['', Validators.required],
      telephone: ['', Validators.required],
      cisco: ['', Validators.required],
  
    });
  }

  }

