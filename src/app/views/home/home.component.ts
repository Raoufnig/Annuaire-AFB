import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'bootstrap-table';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/Classes/base-url';
import { error } from 'jquery';
import { PersonnelService } from 'src/app/Services/personnel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ShowNavbar=false;
  employees: any
  
  tableOptions: any;
  deleted = false;
  actionDelete = false;
  searchText!: string;
  filteredData: any[] = [];
  currentPage = 1;
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileImageUrl!: string;

  public selectProfileImage(): void {
    this.fileInput.nativeElement.click();
  }

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.addEventListener('load', () => {
      this.profileImageUrl = reader.result as string;
    });

    reader.readAsDataURL(file);
  }
  constructor(private formBuilder: FormBuilder, private http : HttpClient, private personnel : PersonnelService){
  
  }


  onSubmit() {
    const formData = new FormData();
    const ciscoInput = document.getElementById('cisco') as HTMLInputElement;
    const fileInput = document.getElementById('file') as HTMLInputElement;
    formData.append('cisco', ciscoInput.value);
    if (fileInput.files && fileInput.files.length > 0) {
      formData.append('file', fileInput.files[0]);
    }
    this.http.post(URL.API_URL+'/personnel'+'/update', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  listpersonnel(){
   this.personnel.getpersonnel().subscribe(res=>{
    this.employees= res;
    console.log(res)
   })
  }


  }








































