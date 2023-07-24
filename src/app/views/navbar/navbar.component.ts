import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  @Output('showAside')showAside= new EventEmitter<boolean>()
  userInfo: any;
  storeData: any;
  statusUser=false;


  constructor(private router : Router){

  }

  ngOnInit() {
    this.storeData = localStorage.getItem("UserInfo")
    this.userInfo = JSON.parse(this.storeData);
    this.statusUser=this.userInfo.userDetails.enabled;
    console.log("userInfo", this.userInfo);
    console.log(this.statusUser);
  }

  showNavbar(){
    this.showAside.emit(true)
  }
  logout(){
   
    localStorage.clear() 

    this.router.navigate(['/']);
    window.location.reload();
    
  }

}
